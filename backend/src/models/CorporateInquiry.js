const mongoose = require('mongoose');

const corporateInquirySchema = new mongoose.Schema(
  {
    // General Info
    companyName: {
      type: String,
      required: [true, 'Company name is required'],
      trim: true,
    },
    contactPerson: {
      type: String,
      required: [true, 'Contact person is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
      trim: true,
    },
    message: {
      type: String,
      trim: true,
    },
    // Inquiry Type & Status
    inquiryType: {
      type: String,
      enum: ['services', 'sponsorship'],
      default: 'services',
    },
    status: {
      type: String,
      enum: ['new', 'in_progress', 'closed'],
      default: 'new',
    },
    // Fields for 'services' type
    employeeCount: {
      type: Number,
    },
    // Fields for 'sponsorship' type
    sponsorshipLevel: {
      type: String,
    },
    proposedContribution: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('CorporateInquiry', corporateInquirySchema);
