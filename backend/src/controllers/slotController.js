const Slot = require('../models/Slot');

// Get available slots (public)
exports.getAvailableSlots = async (req, res) => {
  const { sessionType, date } = req.query;

  const query = {
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
    time: slot.startTime,
  }));

  res.json({
    success: true,
    data: formattedSlots,
  });
};

// Create a new slot (Admin only)
exports.createSlot = async (req, res) => {
  const { date, startTime, endTime, sessionType, location } = req.body;

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

// --- UPDATED: Generate weekly/range slots ---
exports.generateWeeklySlots = async (req, res) => {
  const {
    weekStartDate, // Legacy
    startDate, // New
    endDate, // New
    daysOfWeek,
    startTime,
    endTime,
    slotDurationMinutes,
    slotDuration,
    sessionType,
    sessionTypes,
    location,
    excludeDates,
  } = req.body;

  const effectiveDuration = slotDurationMinutes || slotDuration || 60;
  
  // Determine Session Types
  const typesToUse = (sessionTypes && sessionTypes.length)
    ? sessionTypes
    : sessionType
    ? [sessionType]
    : ['online'];

  const createdSlots = [];
  let skippedCount = 0;
  
  // --- DATE RANGE CALCULATION ---
  // If startDate/endDate provided (New Frontend), use those.
  // Otherwise fall back to weekStartDate (Legacy), defaulting to a 7-day range.
  let rangeStart, rangeEnd;

  if (startDate && endDate) {
      rangeStart = new Date(startDate);
      rangeEnd = new Date(endDate);
  } else if (weekStartDate) {
      rangeStart = new Date(weekStartDate);
      rangeEnd = new Date(weekStartDate);
      rangeEnd.setDate(rangeEnd.getDate() + 6); // Default to 1 week
  } else {
      return res.status(400).json({ success: false, message: "Start date is required" });
  }

  // Set times to midnight to ensure clean day iteration
  rangeStart.setHours(0,0,0,0);
  rangeEnd.setHours(0,0,0,0);

  const endTimeParts = endTime.split(':').map(Number);
  const excluded = new Set((excludeDates || []).map((d) => new Date(d).toDateString()));

  // Loop through every day in the range
  const loopDate = new Date(rangeStart);

  while (loopDate <= rangeEnd) {
    // 1. Check if this specific date is excluded
    if (excluded.has(loopDate.toDateString())) {
        loopDate.setDate(loopDate.getDate() + 1);
        continue;
    }

    // 2. Check if this day of the week (0-6) is allowed
    // getDay(): 0 = Sunday, 1 = Monday, etc.
    if (!daysOfWeek.includes(loopDate.getDay())) {
        loopDate.setDate(loopDate.getDate() + 1);
        continue;
    }

    // 3. Generate slots for this valid day
    const [startHour, startMinute] = startTime.split(':').map(Number);
    
    // We create a new date object for the slot generation to not mess up the loopDate
    const currentDayDate = new Date(loopDate); 

    for (const type of typesToUse) {
      let slotStart = new Date(currentDayDate);
      slotStart.setHours(startHour, startMinute, 0, 0);

      const slotEndLimit = new Date(currentDayDate);
      slotEndLimit.setHours(endTimeParts[0], endTimeParts[1], 0, 0);

      while (slotStart < slotEndLimit) {
        const slotEnd = new Date(slotStart.getTime() + effectiveDuration * 60000);
        
        // Stop if the slot exceeds the end time
        if (slotEnd > slotEndLimit) break;

        const startTimeStr = `${String(slotStart.getHours()).padStart(2, '0')}:${String(
          slotStart.getMinutes(),
        ).padStart(2, '0')}`;
        
        const endTimeStr = `${String(slotEnd.getHours()).padStart(2, '0')}:${String(
          slotEnd.getMinutes(),
        ).padStart(2, '0')}`;

        // Check for duplicates
        const existing = await Slot.findOne({
          date: currentDayDate,
          startTime: startTimeStr,
          sessionType: type,
        });

        if (!existing) {
          const newSlot = await Slot.create({
            date: currentDayDate,
            startTime: startTimeStr,
            endTime: endTimeStr,
            sessionType: type,
            isActive: true,
            isAvailable: true,
            isBooked: false,
            // Store the start of the generation range for reference
            generatedWeekStart: rangeStart, 
            location,
          });
          createdSlots.push(newSlot);
        } else {
          skippedCount += 1;
        }

        // Move to next slot
        slotStart = slotEnd;
      }
    }

    // Move loop to next day
    loopDate.setDate(loopDate.getDate() + 1);
  }

  res.status(201).json({
    success: true,
    message: `Slots generated successfully from ${rangeStart.toDateString()} to ${rangeEnd.toDateString()}`,
    createdCount: createdSlots.length,
    skippedCount,
    data: createdSlots,
  });
};