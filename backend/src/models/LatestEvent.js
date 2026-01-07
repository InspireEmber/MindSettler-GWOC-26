const mongoose = require('mongoose');

const latestEventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  googleFormLink: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active',
  },
}, { timestamps: true });

const LatestEvent = mongoose.model('LatestEvent', latestEventSchema);

module.exports = LatestEvent;
