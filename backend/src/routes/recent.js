const express = require('express');
const router = express.Router();
const rec = require('../controllers/recentController');
const { verifyToken } = require('../middleware/auth');

router.get('/', verifyToken, rec.getRecent);
router.post('/', verifyToken, rec.addRecent);

module.exports = router;
