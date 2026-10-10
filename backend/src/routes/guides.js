const express = require('express');
const router = express.Router();
const guideController = require('../controllers/guideController');

router.get('/', guideController.getAll);
router.get('/:id', guideController.getById);
router.post('/:id/book', guideController.bookGuide);

module.exports = router;
