const express = require('express');
const router = express.Router();
const itin = require('../controllers/itineraryController');
const { verifyToken } = require('../middleware/auth');

router.post('/generate', verifyToken, itin.generate);
router.get('/', verifyToken, itin.getMyItineraries);

module.exports = router;
