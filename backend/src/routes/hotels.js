const express = require('express');
const router = express.Router();
const hotelController = require('../controllers/hotelController');

router.get('/', hotelController.getAll);
router.get('/:id', hotelController.getById);
router.get('/:id/rooms', hotelController.getRooms);
router.post('/:id/book', hotelController.bookRoom);

module.exports = router;
