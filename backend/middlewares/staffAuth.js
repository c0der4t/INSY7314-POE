const jwt = require('jsonwebtoken');
require('dotenv').config();

const requireStaffAuth = (req, res, next) => {
  const authHeader = req.headers['authorization'] || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;
  if (!token) return res.status(401).json({ message: 'Access Denied: No Token Provided' });

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    if (!payload || !payload.role) return res.status(403).json({ message: 'Invalid staff token' });
    req.staff = payload;
    next();
  } catch {
    return res.status(403).json({ message: 'Invalid Token' });
  }
};

const requireRole = (role) => (req, res, next) => {
  if (!req.staff || req.staff.role !== role) return res.status(403).json({ message: 'Forbidden' });
  next();
};

module.exports = { requireStaffAuth, requireRole };
