// courseship-server/middleware/auth.js
const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  const header = req.header('Authorization');
  if (!header) return res.status(401).json({ message: 'No token, authorization denied' });

  const token = header.replace('Bearer ', '').trim();
  if (!token) return res.status(401).json({ message: 'No token, authorization denied' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: decoded.id, role: decoded.role };
    next();
  } catch (err) {
    console.error('Auth error:', err);
    res.status(401).json({ message: 'Token not valid' });
  }
};

module.exports = auth;
