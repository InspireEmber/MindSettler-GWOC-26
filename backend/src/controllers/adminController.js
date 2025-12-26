const Appointment = require('../models/Appointment');
const Slot = require('../models/Slot');
const User = require('../models/User');
const { createEvent, deleteEvent, isGoogleCalendarEnabled } = require('../config/googleCalendar');

// Get all appointments (Admin only)
exports.getAllAppointments = async (req, res) => {
  const { status, sessionType, date } = req.query;

  const query = {};
  if (status) query.status = status;
  if (sessionType) query.sessionType = sessionType;
  if (date) {
    const startDate = new Date(date);
    startDate.setHours(0, 0, 0, 0);
    const endDate = new Date(date);
    endDate.setHours(23, 59, 59, 999);
    query.createdAt = { $gte: startDate, $lte: endDate };
  }

  const appointments = await Appointment.find(query)
    .populate('user', 'name email phone')
    .populate('slot', 'date startTime endTime sessionType')
    .sort({ createdAt: -1 });

  res.json({
    success: true,
    data: appointments,
  });
};

// Approve/confirm an appointment (Admin only)
// Optionally attaches a meeting link and Google Calendar event.
exports.approveAppointment = async (req, res) => {
  const { id } = req.params;
  const { meetingLink } = req.body;

  const appointment = await Appointment.findById(id)
    .populate('slot')
    .populate('user', 'name email');

  if (!appointment) {
    return res.status(404).json({
      success: false,
      message: 'Appointment not found',
    });
  }

  if (appointment.status === 'confirmed') {
    return res.status(400).json({
      success: false,
      message: 'Appointment is already confirmed',
    });
  }

  appointment.status = 'confirmed';
  appointment.confirmedAt = new Date();

  if (meetingLink) {
    appointment.meetingLink = meetingLink;
  }

  // Optional Google Calendar event creation (non-blocking)
  if (isGoogleCalendarEnabled() && !appointment.calendarEventId) {
    try {
      const event = await createEvent({
        appointment,
        slot: appointment.slot,
        user: appointment.user,
        meetingLink: appointment.meetingLink,
      });
      console.log("Created Google Event:", event);
      if (event && event.eventId) {
        appointment.calendarEventId = event.eventId;
        appointment.calendarEventLink = event.htmlLink;
      }
    } catch (err) {
      // Log but do not fail the approval flow
      console.error('Failed to create Google Calendar event:', err.message || err);
    }
  }

  await appointment.save();

  res.json({
    success: true,
    message: 'Appointment confirmed successfully',
    data: appointment,
  });
};

// Reject an appointment (Admin only)
exports.rejectAppointment = async (req, res) => {
  const { id } = req.params;
  const { reason } = req.body;

  const appointment = await Appointment.findById(id).populate('slot');

  if (!appointment) {
    return res.status(404).json({
      success: false,
      message: 'Appointment not found',
    });
  }

  if (appointment.status === 'rejected') {
    return res.status(400).json({
      success: false,
      message: 'Appointment is already rejected',
    });
  }

  appointment.status = 'rejected';
  appointment.rejectedAt = new Date();
  appointment.rejectionReason = reason || '';

  // Free up the slot
  if (appointment.slot) {
    appointment.slot.isBooked = false;
    appointment.slot.isAvailable = true;
    await appointment.slot.save();
  }

  // Optional Google Calendar event cleanup (non-blocking)
  if (appointment.calendarEventId) {
    try {
      await deleteEvent(appointment.calendarEventId);
      appointment.calendarEventId = undefined;
    } catch (err) {
      console.error('Failed to delete Google Calendar event:', err.message || err);
    }
  }

  await appointment.save();

  res.json({
    success: true,
    message: 'Appointment rejected successfully',
    data: appointment,
  });
};

// Update appointment status (Admin only)
exports.updateAppointmentStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const appointment = await Appointment.findById(id).populate('slot').populate('user');

  if (!appointment) {
    return res.status(404).json({
      success: false,
      message: 'Appointment not found',
    });
  }

  const previousStatus = appointment.status;
  appointment.status = status;

  if (status === 'confirmed') {
    appointment.confirmedAt = new Date();
  } else if (status === 'rejected') {
    appointment.rejectedAt = new Date();
    // Free up the slot
    if (appointment.slot) {
      appointment.slot.isBooked = false;
      appointment.slot.isAvailable = true;
      await appointment.slot.save();
    }
  } else if (status === 'completed') {
    // Increment user session tracking
    if (appointment.user) {
      const user = await User.findById(appointment.user._id);
      if (user) {
        user.sessionCount = (user.sessionCount || 0) + 1;
        user.lastSessionAt = new Date();
        await user.save();
      }
    }
  }

  // Optional calendar cleanup if moving away from confirmed to cancelled/rejected
  if (
    appointment.calendarEventId &&
    previousStatus === 'confirmed' &&
    (status === 'cancelled' || status === 'rejected')
  ) {
    try {
      await deleteEvent(appointment.calendarEventId);
      appointment.calendarEventId = undefined;
    } catch (err) {
      console.error('Failed to delete Google Calendar event:', err.message || err);
    }
  }

  await appointment.save();

  res.json({
    success: true,
    message: 'Appointment status updated successfully',
    data: appointment,
  });
};

// Get appointment by ID (Admin only)
exports.getAppointmentById = async (req, res) => {
  const { id } = req.params;

  const appointment = await Appointment.findById(id)
    .populate('user', 'name email phone')
    .populate('slot', 'date startTime endTime sessionType');

  if (!appointment) {
    return res.status(404).json({
      success: false,
      message: 'Appointment not found',
    });
  }

  res.json({
    success: true,
    data: appointment,
  });
};

// Mark appointment payment as paid/waived (Admin only)
exports.markAppointmentPayment = async (req, res) => {
  const { id } = req.params;
  const { paymentMethod, paymentReference } = req.body;

  const appointment = await Appointment.findById(id);

  if (!appointment) {
    return res.status(404).json({
      success: false,
      message: 'Appointment not found',
    });
  }

  appointment.paymentStatus = 'paid';
  appointment.paymentMethod = paymentMethod;
  appointment.paymentReference = paymentReference || '';

  await appointment.save();

  res.json({
    success: true,
    message: 'Appointment payment marked as paid',
    data: appointment,
  });
};

// Basic admin stats overview (Admin only)
exports.getStatsOverview = async (req, res) => {
  const [totalAppointments, completedAppointments, upcomingAppointments, totalUsers] =
    await Promise.all([
      Appointment.countDocuments(),
      Appointment.countDocuments({ status: 'completed' }),
      Appointment.countDocuments({ status: 'confirmed' }),
      User.countDocuments(),
    ]);

  res.json({
    success: true,
    data: {
      totalAppointments,
      completedAppointments,
      upcomingAppointments,
      totalUsers,
    },
  });
};
