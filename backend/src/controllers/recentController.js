const pool = require('../config/database');

exports.getRecent = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM recently_accessed WHERE user_id = ? ORDER BY accessed_at DESC LIMIT 5', [req.user.id]);
    return res.json({ success: true, recent: rows });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Failed to fetch recent items' });
  }
};

exports.addRecent = async (req, res) => {
  try {
    const { itemType, itemId, itemTitle, itemImage } = req.body;
    await pool.query(`
      INSERT INTO recently_accessed (user_id, item_type, item_id, item_title, item_image)
      VALUES (?, ?, ?, ?, ?)
    `, [req.user.id, itemType, itemId, itemTitle, itemImage]);
    return res.json({ success: true });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Failed to record recent item' });
  }
};
