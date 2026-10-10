const express = require('express');
const router = express.Router();
const admin = require('../controllers/adminController');
const { verifyToken, adminOnly } = require('../middleware/auth');

router.get('/dashboard', verifyToken, adminOnly, admin.getDashboard);
router.get('/users', verifyToken, adminOnly, admin.getUsers);
router.put('/users/:id/toggle', verifyToken, adminOnly, admin.toggleUser);
router.get('/bookings', verifyToken, adminOnly, admin.getBookings);

module.exports = router;
