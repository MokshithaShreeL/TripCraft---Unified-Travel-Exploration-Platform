const express = require('express');
const router = express.Router();
const dest = require('../controllers/destinationController');

router.get('/', dest.getAll);
router.get('/search', dest.getAll);
router.get('/:id', dest.getById);

module.exports = router;
