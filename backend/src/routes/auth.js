const express = require('express');
const router = express.Router();
const auth = require('../controllers/authController');
const { verifyToken } = require('../middleware/auth');

router.post('/login', auth.login);
router.post('/register', auth.register);
router.get('/me', verifyToken, auth.getMe);
router.put('/update-profile', verifyToken, auth.updateProfile);

// Google OAuth simulation endpoint
router.get('/google', (req, res) => {
  res.redirect('/api/auth/google/callback?code=mock_code');
});
router.get('/google/callback', (req, res) => {
  res.json({ success: true, message: 'Google OAuth callback handled' });
});

module.exports = router;
