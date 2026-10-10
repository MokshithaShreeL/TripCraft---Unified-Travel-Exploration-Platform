const express = require('express');
const router = express.Router();
const albumController = require('../controllers/albumController');

router.get('/', albumController.getAlbums);
router.post('/', albumController.createAlbum);
router.post('/:id/photos', albumController.addPhotos);
router.post('/:id/purchase', albumController.purchaseAlbum);

module.exports = router;
