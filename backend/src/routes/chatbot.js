const express = require('express');
const router = express.Router();
const chat = require('../controllers/chatbotController');

router.post('/message', chat.sendMessage);
router.get('/history/:session', chat.getHistory);

module.exports = router;
