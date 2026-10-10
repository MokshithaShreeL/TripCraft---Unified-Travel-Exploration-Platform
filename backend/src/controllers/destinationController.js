const pool = require('../config/database');

exports.getAll = async (req, res) => {
  try {
    const { category, state, q } = req.query;
    let sql = 'SELECT * FROM destinations WHERE 1=1';
    const params = [];

    if (category && category !== 'All') {
      sql += ' AND category = ?';
      params.push(category);
    }
    if (state && state !== 'All') {
      sql += ' AND state = ?';
      params.push(state);
    }
    if (q) {
      sql += ' AND (name LIKE ? OR state LIKE ? OR tagline LIKE ?)';
      const like = `%${q}%`;
      params.push(like, like, like);
    }

    sql += ' ORDER BY rating DESC';
    const [rows] = await pool.query(sql, params);
    return res.json({ success: true, count: rows.length, data: rows });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Failed to fetch destinations' });
  }
};

exports.getById = async (req, res) => {
  try {
    const { id } = req.params;
    const [dest] = await pool.query('SELECT * FROM destinations WHERE id = ?', [id]);
    if (dest.length === 0) {
      return res.status(404).json({ success: false, message: 'Destination not found' });
    }

    const [hotels] = await pool.query('SELECT * FROM hotels WHERE destination_id = ?', [id]);
    const [packages] = await pool.query('SELECT * FROM travel_packages WHERE destination_id = ?', [id]);
    const [safety] = await pool.query('SELECT * FROM destination_safety WHERE destination_id = ?', [id]);

    return res.json({
      success: true,
      destination: dest[0],
      hotels,
      packages,
      safety: safety[0] || null
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Failed to fetch destination details' });
  }
};
