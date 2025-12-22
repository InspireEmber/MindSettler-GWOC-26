function isUserAuthenticated(req, res, next) {
  // Passport adds req.isAuthenticated when a session exists
  if (req.isAuthenticated && req.isAuthenticated()) {
    // Optional: prevent admins from using the user-only booking flow
    if (req.user && req.user.role === 'admin') {
      return res.status(403).json({
        success: false,
        message: 'User account required to book a session',
      });
    }
    return next();
  }

  return res.status(401).json({
    success: false,
    message: 'Login required',
  });
}

module.exports = isUserAuthenticated;