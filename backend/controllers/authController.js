const jwt = require('jsonwebtoken');
const db = require('../database/db');

const JWT_SECRET = process.env.JWT_SECRET || 'tripcraft_super_secret_jwt_key_2026_nec';

async function login(req, res) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Email and password are required' });
  }

  try {
    const users = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    if (!users || users.length === 0) {
      return res.status(401).json({ success: false, message: 'User with this email not found' });
    }

    const user = users[0];
    // Check credentials (or demo password match)
    if (password !== 'Admin@123' && password !== 'Travel@123' && password !== 'Family@123' && password !== 'Luxury@123' && password !== 'Guide@123' && password !== user.password_hash) {
      return res.status(401).json({ success: false, message: 'Invalid password' });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, name: user.name, role: user.role, loyaltyTier: user.loyalty_tier },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    return res.json({
      success: true,
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        loyaltyTier: user.loyalty_tier,
        loyaltyPoints: user.loyalty_points,
        avatar: user.avatar
      }
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
}

async function loginOAuth(req, res) {
  const { provider = 'google' } = req.body;
  try {
    const users = await db.query('SELECT * FROM users WHERE email = ?', ['priya.backpacker@gmail.com']);
    const user = users[0] || db.inMemoryStore.users[1];

    const token = jwt.sign(
      { id: user.id, email: user.email, name: user.name, role: user.role, loyaltyTier: user.loyalty_tier || 'Gold' },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    return res.json({
      success: true,
      provider,
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        loyaltyTier: user.loyalty_tier || 'Gold',
        loyaltyPoints: user.loyalty_points || 4800,
        avatar: user.avatar
      }
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
}

async function getProfile(req, res) {
  try {
    const users = await db.query('SELECT * FROM users WHERE email = ?', [req.user.email]);
    if (!users || users.length === 0) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    const { password_hash, ...profile } = users[0];
    return res.json({ success: true, profile });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
}

module.exports = {
  login,
  loginOAuth,
  getProfile
};
