// Authentication and authorization middleware

function isAuthenticated(req, res, next) {
  if (req.isAuthenticated && req.isAuthenticated()) {
    return next();
  }

  return res.status(401).json({
    success: false,
    message: 'Authentication required'
  });
}

function requireRole(role) {
  return (req, res, next) => {
    if (!req.user || req.user.role !== role) {
      return res.status(403).json({
        success: false,
        message: 'Forbidden: insufficient permissions'
      });
    }

    next();
  };
}

module.exports = {
  isAuthenticated,
  requireRole
};
