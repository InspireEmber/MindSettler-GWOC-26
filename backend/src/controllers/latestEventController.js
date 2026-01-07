const LatestEvent = require('../models/LatestEvent');

// @desc    Create a new event
// @route   POST /api/latest-events
// @access  Private/Admin
exports.createEvent = async (req, res) => {
  try {
    const event = new LatestEvent(req.body);
    await event.save();
    res.status(201).json(event);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Get all events (for admin)
// @route   GET /api/latest-events/all
// @access  Private/Admin
exports.getAllEvents = async (req, res) => {
  try {
    const events = await LatestEvent.find();
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all active events (for public)
// @route   GET /api/latest-events
// @access  Public
exports.getActiveEvents = async (req, res) => {
  try {
    const events = await LatestEvent.find({ status: 'active' });
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update an event
// @route   PUT /api/latest-events/:id
// @access  Private/Admin
exports.updateEvent = async (req, res) => {
  try {
    const event = await LatestEvent.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.json(event);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete an event
// @route   DELETE /api/latest-events/:id
// @access  Private/Admin
exports.deleteEvent = async (req, res) => {
  try {
    const event = await LatestEvent.findByIdAndDelete(req.params.id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.json({ message: 'Event deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
