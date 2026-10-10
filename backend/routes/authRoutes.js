const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { authenticateToken } = require('../middleware/authMiddleware');

router.post('/login', authController.login);
router.post('/oauth', authController.loginOAuth);
router.get('/me', authenticateToken, authController.getProfile);

module.exports = router;
