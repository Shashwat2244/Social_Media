const express = require('express');
const router = express.Router();

const postsController = require('../controllers/posts_control');
router.get('/content',postsController.content);

module.exports = router;