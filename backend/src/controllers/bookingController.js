const Appointment = require('../models/Appointment');
const User = require('../models/User');
const Slot = require('../models/Slot');

// Create a new booking request (authenticated user only)
// Validation is handled via Joi in the route layer.
exports.createBooking = async (req, res) => {
  const { sessionType, preferredDate, preferredTime, slotId, isFirstSession, message } = req.body;

  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: 'Login required',
    });
  }

  const userId = req.user._id;

  // Ensure referenced user exists (defensive check)
  const user = await User.findById(userId);
  if (!user) {
    return res.status(400).json({
      success: false,
      message: 'User account not found for this session',
    });
  }

  // Find the selected slot (prefer slotId, fall back to preferredTime for compatibility)
  const selectedSlotId = slotId || preferredTime;
  const slot = await Slot.findById(selectedSlotId);
  if (!slot) {
    return res.status(404).json({
      success: false,
      message: 'Selected time slot not found',
    });
  }

  if (!slot.isAvailable || slot.isBooked) {
    return res.status(400).json({
      success: false,
      message: 'Selected time slot is no longer available',
    });
  }

  // Create appointment (always starts as pending; confirmation is admin-only)
  const appointment = await Appointment.create({
    user: user._id,
    slot: slot._id,
    sessionType,
    isFirstSession: isFirstSession !== undefined ? isFirstSession : true,
    message: message || '',
    status: 'pending',
    paymentStatus: 'pending',
  });

  // Mark slot as booked
  slot.isBooked = true;
  slot.isAvailable = false;
  await slot.save();

  // Keep existing response shape; add fields only if needed later.
  res.status(201).json({
    success: true,
    message: 'Booking request created successfully',
    data: {
      id: appointment._id,
      status: appointment.status,
      sessionType: appointment.sessionType,
      preferredDate: slot.date,
      preferredTime: slot.startTime,
    },
  });
};

// Get booking status (public)
exports.getBookingStatus = async (req, res) => {
  const { id } = req.params;

  const appointment = await Appointment.findById(id)
    .populate('user', 'name email phone')
    .populate('slot', 'date startTime endTime sessionType');

  if (!appointment) {
    return res.status(404).json({
      success: false,
      message: 'Booking not found',
    });
  }

  // 🔒 SECURITY: Only owner can access(Authorization on status)
  if (
    req.user &&
    appointment.user &&
    appointment.user._id.toString() !== req.user._id.toString()
  ) {
    return res.status(403).json({
      success: false,
      message: 'Unauthorized access',
    });
  }

  res.json({
    success: true,
    data: {
      id: appointment._id,
      name: appointment.user.name,
      email: appointment.user.email,
      phone: appointment.user.phone,
      status: appointment.status,
      sessionType: appointment.sessionType,
      preferredDate: appointment.slot.date,
      preferredTime: appointment.slot.startTime,
      isFirstSession: appointment.isFirstSession,
      message: appointment.message,
      createdAt: appointment.createdAt,
      // Non-breaking additions:
      paymentStatus: appointment.paymentStatus,
      meetingLink: appointment.meetingLink || null,
      // ✅ ADD THIS
      rejectionReason: appointment.rejectionReason || null,
    },
  });
};
