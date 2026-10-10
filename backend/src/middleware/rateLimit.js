// In-memory simple rate limiter
const requestCounts = new Map();

function rateLimit(windowMs = 60000, maxRequests = 100) {
  return (req, res, next) => {
    const ip = req.ip || req.connection.remoteAddress || '127.0.0.1';
    const now = Date.now();

    if (!requestCounts.has(ip)) {
      requestCounts.set(ip, { count: 1, resetAt: now + windowMs });
      return next();
    }

    const record = requestCounts.get(ip);
    if (now > record.resetAt) {
      record.count = 1;
      record.resetAt = now + windowMs;
      return next();
    }

    record.count += 1;
    if (record.count > maxRequests) {
      return res.status(429).json({ success: false, message: 'Too many requests. Please slow down.' });
    }

    next();
  };
}

module.exports = rateLimit;
