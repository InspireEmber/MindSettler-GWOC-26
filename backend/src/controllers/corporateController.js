const CorporateInquiry = require('../models/CorporateInquiry');

// Public: create a new corporate inquiry
exports.createInquiry = async (req, res) => {
  const { companyName, contactPerson, email, phone, employeeCount, message } = req.body;

  const inquiry = await CorporateInquiry.create({
    companyName,
    contactPerson,
    email,
    phone,
    employeeCount,
    message,
  });

  res.status(201).json({
    success: true,
    message: 'Inquiry submitted successfully',
    data: inquiry,
  });
};

// Admin: list inquiries with optional status filter
exports.getInquiries = async (req, res) => {
  const { status } = req.query;

  const query = {};
  if (status) {
    query.status = status;
  }

  const inquiries = await CorporateInquiry.find(query).sort({ createdAt: -1 });

  res.json({
    success: true,
    data: inquiries,
  });
};

// Admin: update inquiry status
exports.updateInquiryStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const inquiry = await CorporateInquiry.findById(id);
  if (!inquiry) {
    return res.status(404).json({
      success: false,
      message: 'Inquiry not found',
    });
  }

  inquiry.status = status;
  await inquiry.save();

  res.json({
    success: true,
    message: 'Inquiry status updated successfully',
    data: inquiry,
  });
};
