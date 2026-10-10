const express = require('express');
const router = express.Router();
const comm = require('../controllers/communityController');
const { verifyToken } = require('../middleware/auth');

router.get('/posts', comm.getPosts);
router.post('/posts', verifyToken, comm.createPost);
router.put('/posts/:id/like', verifyToken, comm.likePost);

module.exports = router;
