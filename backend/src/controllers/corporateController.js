const CorporateInquiry = require('../models/CorporateInquiry');

// Public: create a new corporate inquiry
exports.createInquiry = async (req, res) => {
  try {
    // Pass the entire request body to the create method.
    // Mongoose will automatically pick the fields that are defined in the Schema.
    const inquiry = await CorporateInquiry.create(req.body);

    res.status(201).json({
      success: true,
      message: 'Inquiry submitted successfully',
      data: inquiry,
    });
  } catch (error) {
    // This will catch validation errors from Mongoose as well.
    res.status(400).json({ success: false, message: error.message });
  }
};

// Admin: list inquiries with optional filters
exports.getInquiries = async (req, res) => {
  try {
    const { status, inquiryType } = req.query;

    const filterConditions = [];

    // Add status filter if it's provided
    if (status) {
      filterConditions.push({ status: status });
    }

    // Add inquiryType filter if it's provided
    if (inquiryType === 'services') {
      // For 'services', find docs where type is 'services' OR it doesn't exist (for old data)
      filterConditions.push({ $or: [{ inquiryType: 'services' }, { inquiryType: { $exists: false } }] });
    } else if (inquiryType === 'sponsorship') {
      // For 'sponsorship', find docs where type is explicitly 'sponsorship'
      filterConditions.push({ inquiryType: 'sponsorship' });
    }

    // Construct the final query using $and if there are multiple conditions
    const query = filterConditions.length > 0 ? { $and: filterConditions } : {};

    const inquiries = await CorporateInquiry.find(query).sort({ createdAt: -1 });

    res.json({
      success: true,
      data: inquiries,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to retrieve inquiries' });
  }
};

// Admin: update inquiry status
exports.updateInquiryStatus = async (req, res) => {
  try {
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
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

