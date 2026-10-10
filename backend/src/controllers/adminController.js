const pool = require('../config/database');

exports.getDashboard = async (req, res) => {
  try {
    const [[{ totalUsers }]] = await pool.query('SELECT COUNT(*) as totalUsers FROM users');
    const [[{ totalBookings }]] = await pool.query('SELECT COUNT(*) as totalBookings FROM bookings');
    const [[{ totalDestinations }]] = await pool.query('SELECT COUNT(*) as totalDestinations FROM destinations');
    const [recentBookings] = await pool.query('SELECT * FROM bookings ORDER BY created_at DESC LIMIT 5');

    return res.json({
      success: true,
      stats: {
        totalUsers,
        totalBookings,
        totalRevenue: 345000,
        totalDestinations
      },
      recentBookings
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Admin dashboard error' });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const [users] = await pool.query('SELECT id, name, email, role, language, phone, is_active, created_at FROM users ORDER BY created_at DESC');
    return res.json({ success: true, users });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Failed to fetch users' });
  }
};

exports.toggleUser = async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('UPDATE users SET is_active = NOT is_active WHERE id = ?', [id]);
    return res.json({ success: true, message: 'User status toggled' });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Toggle failed' });
  }
};

exports.getBookings = async (req, res) => {
  try {
    const [bookings] = await pool.query('SELECT * FROM bookings ORDER BY created_at DESC');
    return res.json({ success: true, bookings });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Failed to fetch bookings' });
  }
};
