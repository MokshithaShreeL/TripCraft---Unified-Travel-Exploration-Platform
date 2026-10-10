const express = require('express');
const router = express.Router();
const packageController = require('../controllers/packageController');

router.get('/', packageController.getAll);
router.get('/:id', packageController.getById);
router.post('/:id/book', packageController.bookPackage);

module.exports = router;
