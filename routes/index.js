const express = require('express');
const homeController = require('../controllers/homeController');
const userController = require('../controllers/userController');
const postController = require('../controllers/postController');

const router = express.Router();
router.get('/', homeController.index)

router.get('/users/login', userController.login)
router.get('/post/add', postController.add)

module.exports = router;