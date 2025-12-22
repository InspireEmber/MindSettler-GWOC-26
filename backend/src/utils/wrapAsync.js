// Wrap async route handlers to forward errors to Express error handler
module.exports = function wrapAsync(fn) {
  return function wrapped(req, res, next) {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};
