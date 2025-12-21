const Slot = require('../models/Slot');

// Get available slots
exports.getAvailableSlots = async (req, res) => {
  try {
    const { sessionType, date } = req.query;

    const query = {
      isAvailable: true,
      isBooked: false
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
        $lte: endDate
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

    const formattedSlots = slots.map(slot => ({
      id: slot._id,
      time: slot.startTime,
      date: slot.date,
      sessionType: slot.sessionType
    }));

    res.json({
      success: true,
      data: formattedSlots
    });
  } catch (error) {
    console.error('Error fetching available slots:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch available slots',
      error: error.message
    });
  }
};

// Create a new slot (Admin only)
exports.createSlot = async (req, res) => {
  try {
    const { date, startTime, endTime, sessionType } = req.body;

    if (!date || !startTime || !sessionType) {
      return res.status(400).json({
        success: false,
        message: 'Please provide date, startTime, and sessionType'
      });
    }

    // Check if slot already exists
    const existingSlot = await Slot.findOne({
      date: new Date(date),
      startTime,
      sessionType
    });

    if (existingSlot) {
      return res.status(400).json({
        success: false,
        message: 'Slot already exists for this date and time'
      });
    }

    const slot = await Slot.create({
      date: new Date(date),
      startTime,
      endTime: endTime || null,
      sessionType,
      isAvailable: true,
      isBooked: false
    });

    res.status(201).json({
      success: true,
      message: 'Slot created successfully',
      data: slot
    });
  } catch (error) {
    console.error('Error creating slot:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create slot',
      error: error.message
    });
  }
};

// Update slot availability (Admin only)
exports.updateSlot = async (req, res) => {
  try {
    const { id } = req.params;
    const { isAvailable, isBooked } = req.body;

    const slot = await Slot.findById(id);
    if (!slot) {
      return res.status(404).json({
        success: false,
        message: 'Slot not found'
      });
    }

    if (isAvailable !== undefined) {
      slot.isAvailable = isAvailable;
    }
    if (isBooked !== undefined) {
      slot.isBooked = isBooked;
    }

    await slot.save();

    res.json({
      success: true,
      message: 'Slot updated successfully',
      data: slot
    });
  } catch (error) {
    console.error('Error updating slot:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update slot',
      error: error.message
    });
  }
};

// Delete a slot (Admin only)
exports.deleteSlot = async (req, res) => {
  try {
    const { id } = req.params;

    const slot = await Slot.findById(id);
    if (!slot) {
      return res.status(404).json({
        success: false,
        message: 'Slot not found'
      });
    }

    if (slot.isBooked) {
      return res.status(400).json({
        success: false,
        message: 'Cannot delete a booked slot'
      });
    }

    await Slot.findByIdAndDelete(id);

    res.json({
      success: true,
      message: 'Slot deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting slot:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete slot',
      error: error.message
    });
  }
};

// Get all slots (Admin only)
exports.getAllSlots = async (req, res) => {
  try {
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

    const slots = await Slot.find(query)
      .sort({ date: 1, startTime: 1 });

    res.json({
      success: true,
      data: slots
    });
  } catch (error) {
    console.error('Error fetching slots:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch slots',
      error: error.message
    });
  }
};
