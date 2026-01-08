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

// Add to Google Calendar
const { google } = require('googleapis');

exports.addToGoogleCalendar = async (req, res) => {
  const { id } = req.params;

  // Fetch user explicitly to get the hidden access tokens
  const user = await User.findById(req.user._id).select('+googleAccessToken +googleRefreshToken');

  if (!user || !user.googleAccessToken) {
    return res.status(401).json({
      success: false,
      message: 'Please sign in with Google to use this feature.',
    });
  }

  const appointment = await Appointment.findById(id).populate('slot');
  if (!appointment) {
    return res.status(404).json({ success: false, message: 'Booking not found' });
  }

  // Ensure owner
  if (appointment.user.toString() !== user._id.toString()) {
    return res.status(403).json({ success: false, message: 'Unauthorized' });
  }

  const oauth2Client = new google.auth.OAuth2();
  oauth2Client.setCredentials({
    access_token: user.googleAccessToken,
    refresh_token: user.googleRefreshToken
  });

  const calendar = google.calendar({ version: 'v3', auth: oauth2Client });

  // Calculate times
  // Assuming slot.date is a Date object and startTime/endTime are strings like "14:00"
  const dateStr = appointment.slot.date.toISOString().split('T')[0];
  const startDateTime = `${dateStr}T${appointment.slot.startTime}:00`;
  const endDateTime = `${dateStr}T${appointment.slot.endTime}:00`;

  // Adjust for timezone if necessary. For now, assuming local/Z or standard ISO.
  // Better to ensure these are full ISO strings with timezone offset.
  // For simplicity, we'll try sending them as is or converting to a specific timezone if known.
  // Ideally, your backend should store time in UTC or precise ISO.

  const event = {
    summary: 'MindSettler Session',
    description: `Psycho-education session (${appointment.sessionType}).`,
    start: {
      dateTime: new Date(startDateTime).toISOString(),
      timeZone: 'Asia/Kolkata', // Set your default timezone or make dynamic
    },
    end: {
      dateTime: new Date(endDateTime).toISOString(),
      timeZone: 'Asia/Kolkata',
    },
  };

  try {
    const response = await calendar.events.insert({
      calendarId: 'primary',
      resource: event,
    });

    res.json({
      success: true,
      message: 'Event added to your Google Calendar!',
      link: response.data.htmlLink,
    });
  } catch (error) {
    console.error('Google Calendar Error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to add event to Google Calendar. Token might be expired. Please re-login.',
    });
  }
};
