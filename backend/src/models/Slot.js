const mongoose = require('mongoose');

const slotSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true
  },
  startTime: {
    type: String,
    required: true
  },
  endTime: {
    type: String,
    required: true,
    default: function() {
      // Default to 60 minutes after startTime
      const [hours, minutes] = this.startTime.split(':');
      const endHour = (parseInt(hours) + 1) % 24;
      return `${endHour.toString().padStart(2, '0')}:${minutes}`;
    }
  },
  sessionType: {
    type: String,
    enum: ['online', 'offline'],
    required: true
  },
  isAvailable: {
    type: Boolean,
    default: true
  },
  isBooked: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Index for efficient querying
slotSchema.index({ date: 1, startTime: 1, sessionType: 1 });

module.exports = mongoose.model('Slot', slotSchema);
