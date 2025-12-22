const mongoose = require('mongoose');

const corporateInquirySchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: true,
    trim: true,
  },
  contactPerson: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
  },
  phone: {
    type: String,
    trim: true,
  },
  employeeCount: {
    type: Number,
  },
  message: {
    type: String,
    trim: true,
  },
  status: {
    type: String,
    enum: ['new', 'in_progress', 'closed'],
    default: 'new',
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('CorporateInquiry', corporateInquirySchema);
