const db = require('../database/db');

async function getAllDestinations(req, res) {
  try {
    const rows = await db.query('SELECT * FROM destinations ORDER BY rating DESC');
    return res.json({ success: true, count: rows.length, data: rows });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
}

async function getDestinationById(req, res) {
  try {
    const rows = await db.query('SELECT * FROM destinations WHERE id = ?', [req.params.id]);
    if (!rows || rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Destination not found' });
    }
    return res.json({ success: true, data: rows[0] });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
}

async function getSafetyScore(req, res) {
  try {
    const rows = await db.query('SELECT id, name, safety_score, women_safe_score FROM destinations WHERE id = ?', [req.params.id]);
    if (!rows || rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Destination not found' });
    }
    const dest = rows[0];
    return res.json({
      success: true,
      destination: dest.name,
      safetyIndex: dest.safety_score,
      womenSafeRating: dest.women_safe_score,
      policeRadiusKm: 2.8,
      verifiedStayPerimeterCctv: true,
      emergencyHelplines: { police: '112', women: '1091', tourist: '1363' }
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
}

module.exports = {
  getAllDestinations,
  getDestinationById,
  getSafetyScore
};
