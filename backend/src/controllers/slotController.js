const Slot = require('../models/Slot');

// Get available slots (public)
exports.getAvailableSlots = async (req, res) => {
  const { sessionType, date } = req.query;

  const query = {
    // Only active, not-booked slots
    isActive: true,
    isBooked: false,
  };

  if (sessionType) {
    query.sessionType = sessionType;
  }

  if (date) {
    const startDate = new Date(date);
    startDate.setHours(0, 0, 0, 0);
    const endDate = new Date(date);
    endDate.setHours(23, 59, 59, 999);

    query.date = {
      $gte: startDate,
      $lte: endDate,
    };
  } else {
    // Default to today and future dates
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    query.date = { $gte: today };
  }

  const slots = await Slot.find(query)
    .sort({ date: 1, startTime: 1 })
    .select('_id date startTime endTime sessionType');

  const formattedSlots = slots.map((slot) => ({
    id: slot._id,
    date: slot.date,
    startTime: slot.startTime,
    endTime: slot.endTime,
    sessionType: slot.sessionType,
    // Backwards-compatible alias used by older frontends
    time: slot.startTime,
  }));

  res.json({
    success: true,
    data: formattedSlots,
  });
};

// Create a new slot (Admin only) - body validated via Joi
exports.createSlot = async (req, res) => {
  const { date, startTime, endTime, sessionType, location } = req.body;

  // Check if slot already exists
  const existingSlot = await Slot.findOne({
    date: new Date(date),
    startTime,
    sessionType,
  });

  if (existingSlot) {
    return res.status(400).json({
      success: false,
      message: 'Slot already exists for this date and time',
    });
  }

  const slot = await Slot.create({
    date: new Date(date),
    startTime,
    endTime: endTime || undefined,
    sessionType,
    isActive: true,
    isAvailable: true,
    isBooked: false,
    location,
  });

  res.status(201).json({
    success: true,
    message: 'Slot created successfully',
    data: slot,
  });
};

// Update slot availability (Admin only)
exports.updateSlot = async (req, res) => {
  const { id } = req.params;
  const { isAvailable, isBooked } = req.body;

  const slot = await Slot.findById(id);
  if (!slot) {
    return res.status(404).json({
      success: false,
      message: 'Slot not found',
    });
  }

  if (isAvailable !== undefined) {
    slot.isAvailable = isAvailable;
    // Keep isActive aligned with manual availability toggles for public API
    slot.isActive = isAvailable;
  }
  if (isBooked !== undefined) {
    slot.isBooked = isBooked;
  }

  await slot.save();

  res.json({
    success: true,
    message: 'Slot updated successfully',
    data: slot,
  });
};

// Delete a slot (Admin only)
exports.deleteSlot = async (req, res) => {
  const { id } = req.params;

  const slot = await Slot.findById(id);
  if (!slot) {
    return res.status(404).json({
      success: false,
      message: 'Slot not found',
    });
  }

  if (slot.isBooked) {
    return res.status(400).json({
      success: false,
      message: 'Cannot delete a booked slot',
    });
  }

  await Slot.findByIdAndDelete(id);

  res.json({
    success: true,
    message: 'Slot deleted successfully',
  });
};

// Get all slots (Admin only)
exports.getAllSlots = async (req, res) => {
  const { date, sessionType, isAvailable, isBooked } = req.query;

  const query = {};
  if (date) {
    const startDate = new Date(date);
    startDate.setHours(0, 0, 0, 0);
    const endDate = new Date(date);
    endDate.setHours(23, 59, 59, 999);
    query.date = { $gte: startDate, $lte: endDate };
  }
  if (sessionType) query.sessionType = sessionType;
  if (isAvailable !== undefined) query.isAvailable = isAvailable === 'true';
  if (isBooked !== undefined) query.isBooked = isBooked === 'true';

  const slots = await Slot.find(query).sort({ date: 1, startTime: 1 });

  res.json({
    success: true,
    data: slots,
  });
};

// Generate weekly slots (Admin only) - body validated via Joi
exports.generateWeeklySlots = async (req, res) => {
  const {
    weekStartDate,
    daysOfWeek,
    startTime,
    endTime,
    slotDurationMinutes,
    sessionType,
    location,
    excludeDates,
  } = req.body;

  const createdSlots = [];
  const weekStart = new Date(weekStartDate);
  weekStart.setHours(0, 0, 0, 0);

  const endTimeParts = endTime.split(':').map(Number);

  const excluded = new Set((excludeDates || []).map((d) => new Date(d).toDateString()));

  for (const dayOfWeek of daysOfWeek) {
    const dayDate = new Date(weekStart);
    dayDate.setDate(weekStart.getDate() + dayOfWeek);

    if (excluded.has(dayDate.toDateString())) continue;

    const [startHour, startMinute] = startTime.split(':').map(Number);
    let slotStart = new Date(dayDate);
    slotStart.setHours(startHour, startMinute, 0, 0);

    const slotEndLimit = new Date(dayDate);
    slotEndLimit.setHours(endTimeParts[0], endTimeParts[1], 0, 0);

    while (slotStart < slotEndLimit) {
      const slotEnd = new Date(slotStart.getTime() + slotDurationMinutes * 60000);
      if (slotEnd > slotEndLimit) break;

      const startTimeStr = `${String(slotStart.getHours()).padStart(2, '0')}:${String(
        slotStart.getMinutes(),
      ).padStart(2, '0')}`;
      const endTimeStr = `${String(slotEnd.getHours()).padStart(2, '0')}:${String(
        slotEnd.getMinutes(),
      ).padStart(2, '0')}`;

      const existing = await Slot.findOne({
        date: dayDate,
        startTime: startTimeStr,
        sessionType,
      });

      if (!existing) {
        const newSlot = await Slot.create({
          date: dayDate,
          startTime: startTimeStr,
          endTime: endTimeStr,
          sessionType,
          isActive: true,
          isAvailable: true,
          isBooked: false,
          generatedWeekStart: weekStart,
          location,
        });
        createdSlots.push(newSlot);
      }

      slotStart = slotEnd;
    }
  }

  res.status(201).json({
    success: true,
    message: 'Weekly slots generated successfully',
    data: createdSlots,
  });
};
