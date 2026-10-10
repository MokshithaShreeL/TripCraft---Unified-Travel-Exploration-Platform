const jwt = require('jsonwebtoken');
const prisma = require('../models/prismaClient');

const JWT_SECRET = process.env.JWT_SECRET || 'tripcraft_super_secret_jwt_key_2024_min32chars';

async function authenticateUser(req, res, next) {
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    return res.status(401).json({ success: false, message: 'Authorization token required' });
  }

  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : authHeader;

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    // Fetch latest user from DB to never trust stale frontend roles
    let dbUser = null;
    try {
      dbUser = await prisma.user.findUnique({
        where: { id: decoded.id || decoded.sub },
        select: { id: true, name: true, email: true, role: true, is_active: true }
      });
    } catch (e) {
      // Fallback to decoded payload if DB temporarily busy
    }

    if (dbUser && !dbUser.is_active) {
      return res.status(403).json({ success: false, message: 'Account is deactivated' });
    }

    req.user = dbUser || decoded;
    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: 'Invalid or expired token' });
  }
}

async function authenticateAdmin(req, res, next) {
  authenticateUser(req, res, () => {
    if (!req.user || req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Access denied: Administrator privileges required'
      });
    }
    next();
  });
}

function authorizeRole(...roles) {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `Forbidden: Requires one of [${roles.join(', ')}] roles`
      });
    }
    next();
  };
}

module.exports = {
  authenticateUser,
  authenticateAdmin,
  authorizeRole,
  verifyToken: authenticateUser,
  adminOnly: authenticateAdmin,
  JWT_SECRET
};
