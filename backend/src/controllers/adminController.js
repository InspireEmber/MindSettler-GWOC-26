const Appointment = require('../models/Appointment');
const Slot = require('../models/Slot');

// Get all appointments (Admin only)
exports.getAllAppointments = async (req, res) => {
  try {
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
      data: appointments
    });
  } catch (error) {
    console.error('Error fetching appointments:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch appointments',
      error: error.message
    });
  }
};

// Approve/confirm an appointment (Admin only)
exports.approveAppointment = async (req, res) => {
  try {
    const { id } = req.params;

    const appointment = await Appointment.findById(id)
      .populate('slot');

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: 'Appointment not found'
      });
    }

    if (appointment.status === 'confirmed') {
      return res.status(400).json({
        success: false,
        message: 'Appointment is already confirmed'
      });
    }

    appointment.status = 'confirmed';
    appointment.confirmedAt = new Date();
    await appointment.save();

    res.json({
      success: true,
      message: 'Appointment confirmed successfully',
      data: appointment
    });
  } catch (error) {
    console.error('Error approving appointment:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to approve appointment',
      error: error.message
    });
  }
};

// Reject an appointment (Admin only)
exports.rejectAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    const { reason } = req.body;

    const appointment = await Appointment.findById(id)
      .populate('slot');

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: 'Appointment not found'
      });
    }

    if (appointment.status === 'rejected') {
      return res.status(400).json({
        success: false,
        message: 'Appointment is already rejected'
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

    await appointment.save();

    res.json({
      success: true,
      message: 'Appointment rejected successfully',
      data: appointment
    });
  } catch (error) {
    console.error('Error rejecting appointment:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to reject appointment',
      error: error.message
    });
  }
};

// Update appointment status (Admin only)
exports.updateAppointmentStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const validStatuses = ['pending', 'confirmed', 'rejected', 'completed', 'cancelled'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status. Valid statuses are: ' + validStatuses.join(', ')
      });
    }

    const appointment = await Appointment.findById(id)
      .populate('slot');

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: 'Appointment not found'
      });
    }

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
    }

    await appointment.save();

    res.json({
      success: true,
      message: 'Appointment status updated successfully',
      data: appointment
    });
  } catch (error) {
    console.error('Error updating appointment status:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update appointment status',
      error: error.message
    });
  }
};

// Get appointment by ID (Admin only)
exports.getAppointmentById = async (req, res) => {
  try {
    const { id } = req.params;

    const appointment = await Appointment.findById(id)
      .populate('user', 'name email phone')
      .populate('slot', 'date startTime endTime sessionType');

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: 'Appointment not found'
      });
    }

    res.json({
      success: true,
      data: appointment
    });
  } catch (error) {
    console.error('Error fetching appointment:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch appointment',
      error: error.message
    });
  }
};
