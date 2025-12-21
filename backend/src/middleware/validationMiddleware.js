// Basic validation middleware
const validateBooking = (req, res, next) => {
  const { name, email, phone, sessionType, preferredDate, preferredTime } = req.body;

  if (!name || !email || !phone || !sessionType || !preferredDate || !preferredTime) {
    return res.status(400).json({
      success: false,
      message: 'Missing required fields'
    });
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid email format'
    });
  }

  // Session type validation
  if (!['online', 'offline'].includes(sessionType)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid session type. Must be "online" or "offline"'
    });
  }

  next();
};

module.exports = {
  validateBooking
};
