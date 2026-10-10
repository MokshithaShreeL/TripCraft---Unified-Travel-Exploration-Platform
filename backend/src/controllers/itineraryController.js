const pool = require('../config/database');
const { generateItinerary } = require('../services/claudeService');

exports.generate = async (req, res) => {
  try {
    const { destination, durationDays, budget, travelStyle } = req.body;
    const plan = await generateItinerary({ destination, durationDays, budget, travelStyle });

    const itineraryId = 'itin_' + Date.now();
    const destName = destination || plan.destination || 'India';
    await pool.query(`
      INSERT INTO itineraries (id, user_id, destination, duration_days, estimated_budget, travel_style, day_plans, ai_generated)
      VALUES (?, ?, ?, ?, ?, ?, ?, true)
    `, [itineraryId, req.user.id, destName, plan.durationDays, plan.estimatedBudget, plan.travelStyle, JSON.stringify(plan.dayPlans)]);

    return res.json({ success: true, itineraryId, plan });
  } catch (err) {
    console.error('Itinerary error:', err);
    return res.status(500).json({ success: false, message: 'Failed to generate itinerary' });
  }
};

exports.getMyItineraries = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM itineraries WHERE user_id = ? ORDER BY created_at DESC', [req.user.id]);
    return res.json({ success: true, count: rows.length, itineraries: rows });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Failed to fetch itineraries' });
  }
};
