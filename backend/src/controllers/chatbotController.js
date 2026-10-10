const pool = require('../config/database');
const { chat } = require('../services/claudeService');

exports.sendMessage = async (req, res) => {
  try {
    const { message, sessionId, language } = req.body;
    if (!message) {
      return res.status(400).json({ success: false, message: 'Message is required' });
    }

    const sid = sessionId || 'sess_default';
    const lang = language || 'en';

    // Store user message
    await pool.query('INSERT INTO chat_logs (session_id, role, message, language) VALUES (?, "user", ?, ?)', [sid, message, lang]);

    // Fetch last messages for context
    const [history] = await pool.query('SELECT role, message FROM chat_logs WHERE session_id = ? ORDER BY id ASC LIMIT 10', [sid]);
    const formatted = history.map(h => ({ role: h.role, content: h.message }));

    const reply = await chat(formatted, lang);

    // Store assistant response
    await pool.query('INSERT INTO chat_logs (session_id, role, message, language) VALUES (?, "assistant", ?, ?)', [sid, reply, lang]);

    return res.json({ success: true, reply, sessionId: sid });
  } catch (err) {
    console.error('Chat error:', err);
    return res.status(500).json({ success: false, message: 'Chatbot error' });
  }
};

exports.getHistory = async (req, res) => {
  try {
    const { session } = req.params;
    const [rows] = await pool.query('SELECT role, message, created_at FROM chat_logs WHERE session_id = ? ORDER BY id ASC', [session]);
    return res.json({ success: true, history: rows });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Failed to fetch history' });
  }
};
