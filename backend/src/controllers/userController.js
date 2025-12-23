const User = require('../models/User');
const Appointment = require('../models/Appointment');
const Slot = require('../models/Slot');

// GET /api/users/profile
exports.getProfile = async (req, res) => {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: 'Login required',
    });
  }

  const user = await User.findById(req.user._id);
  if (!user) {
    return res.status(404).json({
      success: false,
      message: 'User not found',
    });
  }

  res.json({
    success: true,
    data: {
      id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role || 'user',
      createdAt: user.createdAt,
    },
  });
};

// Helper to compute session status based on slot date + time
function computeStatus(slotDate, startTime) {
  const [h, m] = startTime.split(':').map(Number);
  const dt = new Date(slotDate);
  dt.setHours(h, m, 0, 0);
  const now = new Date();
  return dt > now ? 'upcoming' : 'completed';
}

// GET /api/users/sessions-summary
exports.getSessionsSummary = async (req, res) => {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: 'Login required',
    });
  }

  const appointments = await Appointment.find({ user: req.user._id }).populate('slot', 'date startTime');

  let total = 0;
  let upcoming = 0;
  let completed = 0;
  let cancelled = 0;
  let approvedUpcoming = 0;
  let pendingUpcoming = 0;


  for (const appt of appointments) {
    total += 1;
    if (appt.status === 'cancelled' || appt.status === 'rejected') {
      cancelled += 1;
      continue;
    }

    if (!appt.slot) continue;

    const statusFromTime = computeStatus(appt.slot.date, appt.slot.startTime);
    if (appt.status === 'confirmed' && statusFromTime === 'upcoming') {
      approvedUpcoming += 1;
    } else if (appt.status === 'pending' && statusFromTime === 'upcoming') {
      pendingUpcoming += 1;
    }else if (statusFromTime === 'upcoming') {
    // fallback if needed
    //don’t need to do anything there, because all sessions are already covered by the conditions above (approvedUpcoming, pendingUpcoming, completed, cancelled/rejected).
    }
    else completed += 1;
  }

  res.json({
    success: true,
    data: {
      totalSessions: total,
      // upcomingSessions: upcoming,
      approvedUpcomingSessions: approvedUpcoming,
      pendingSessions: pendingUpcoming,
      completedSessions: completed,
      cancelledSessions: cancelled,
    },
  });
};

// GET /api/users/sessions
exports.getSessions = async (req, res) => {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: 'Login required',
    });
  }

  const appointments = await Appointment.find({ user: req.user._id })
    .populate('slot', 'date startTime endTime sessionType')
    .sort({ createdAt: -1 });

  const sessions = appointments.map((appt) => {
    const slot = appt.slot;
    const statusFromTime = slot ? computeStatus(slot.date, slot.startTime) : 'unknown';
    let displayCategory = 'unknown';

    if (appt.status === 'confirmed' && statusFromTime === 'upcoming') {
      displayCategory = 'approvedUpcoming';
    } else if (appt.status === 'pending' && statusFromTime === 'upcoming') {
      displayCategory = 'pendingUpcoming';
    } else if (statusFromTime === 'completed') {
      displayCategory = 'completed';
    } else if (appt.status === 'rejected' || appt.status === 'cancelled') {
      displayCategory = 'rejected';
      //Or derivedCategory = 'cancelled';
    }

    return {
      id: appt._id,
      sessionType: appt.sessionType,
      status: appt.status, // confirmed, pending, rejected, cancelled
      derivedStatus: statusFromTime,
      displayCategory, // new field
      date: slot ? slot.date : null,
      startTime: slot ? slot.startTime : null,
      endTime: slot ? slot.endTime : null,
      createdAt: appt.createdAt,
    };
  });

  res.json({
    success: true,
    data: sessions,
  });
};