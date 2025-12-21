const Appointment = require('../models/Appointment');
const User = require('../models/User');
const Slot = require('../models/Slot');

// Create a new booking request
exports.createBooking = async (req, res) => {
  try {
    const { name, email, phone, sessionType, preferredDate, preferredTime, isFirstSession, message } = req.body;

    // Validate required fields
    if (!name || !email || !phone || !sessionType || !preferredDate || !preferredTime) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields'
      });
    }

    // Find or create user
    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({ name, email, phone });
    } else {
      // Update user info if needed
      user.name = name;
      user.phone = phone;
      await user.save();
    }

    // Find the selected slot
    const slot = await Slot.findById(preferredTime);
    if (!slot) {
      return res.status(404).json({
        success: false,
        message: 'Selected time slot not found'
      });
    }

    if (!slot.isAvailable || slot.isBooked) {
      return res.status(400).json({
        success: false,
        message: 'Selected time slot is no longer available'
      });
    }

    // Create appointment
    const appointment = await Appointment.create({
      user: user._id,
      slot: slot._id,
      sessionType,
      isFirstSession: isFirstSession !== undefined ? isFirstSession : true,
      message: message || '',
      status: 'pending'
    });

    // Mark slot as booked
    slot.isBooked = true;
    slot.isAvailable = false;
    await slot.save();

    res.status(201).json({
      success: true,
      message: 'Booking request created successfully',
      data: {
        id: appointment._id,
        status: appointment.status,
        sessionType: appointment.sessionType,
        preferredDate: slot.date,
        preferredTime: slot.startTime
      }
    });
  } catch (error) {
    console.error('Error creating booking:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create booking request',
      error: error.message
    });
  }
};

// Get booking status
exports.getBookingStatus = async (req, res) => {
  try {
    const { id } = req.params;

    const appointment = await Appointment.findById(id)
      .populate('user', 'name email phone')
      .populate('slot', 'date startTime endTime sessionType');

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
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
        createdAt: appointment.createdAt
      }
    });
  } catch (error) {
    console.error('Error fetching booking status:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch booking status',
      error: error.message
    });
  }
};
