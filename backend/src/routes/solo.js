const express = require('express');
const router = express.Router();
const soloController = require('../controllers/soloController');

router.get('/', soloController.getSoloHub);
router.post('/profile', soloController.updateProfile);
router.post('/connect', soloController.sendConnectionRequest);
router.put('/connection/:id', soloController.handleConnection);

module.exports = router;
