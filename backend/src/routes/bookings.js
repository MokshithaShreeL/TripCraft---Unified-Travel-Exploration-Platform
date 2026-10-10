const express = require('express');
const router = express.Router();
const booking = require('../controllers/bookingController');
const { verifyToken } = require('../middleware/auth');

router.post('/', verifyToken, booking.createBooking);
router.get('/', verifyToken, booking.getMyBookings);
router.put('/:id/cancel', verifyToken, booking.cancelBooking);

module.exports = router;
