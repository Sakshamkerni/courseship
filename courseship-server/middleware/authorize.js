// courseship-server/middleware/authorize.js
const authorizeRole = (required) => (req, res, next) => {
  const userRole = req.user?.role;
  if (!userRole) return res.status(401).json({ message: 'Unauthorized' });

  const allowed = Array.isArray(required) ? required : [required];
  if (!allowed.includes(userRole)) {
    return res.status(403).json({ message: 'Forbidden: Insufficient role' });
  }
  next();
};

module.exports = authorizeRole;
