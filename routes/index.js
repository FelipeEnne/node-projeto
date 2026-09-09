const express = require('express');
const rateLimit = require('express-rate-limit');
const homeController = require('../controllers/homeController');
const userController = require('../controllers/userController');
const postController = require('../controllers/postController');

const imageMiddleware = require('../middlewares/imageMiddleware')
const authMiddleware = require('../middlewares/authMiddleware')
const csrfMiddleware = require('../middlewares/csrfMiddleware')

const router = express.Router();

const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 10,
    standardHeaders: true,
    legacyHeaders: false,
    message: 'Muitas tentativas. Tente novamente em alguns minutos.'
});

router.get('/', homeController.index)
router.get('/users/login', userController.login);
router.post('/users/login', authLimiter, csrfMiddleware.validateCsrf, userController.loginAction);

router.get('/users/register', userController.register);
router.post('/users/register', authLimiter, csrfMiddleware.validateCsrf, userController.registerAction);

router.get('/users/forget', userController.forget);
router.post('/users/forget', authLimiter, csrfMiddleware.validateCsrf, userController.forgetAction);

router.get('/users/reset/:token', userController.forgetToken)
router.post('/users/reset/:token', authLimiter, csrfMiddleware.validateCsrf, userController.forgetTokenAction)

router.post('/users/logout', csrfMiddleware.validateCsrf, userController.logout);

router.get('/profile',authMiddleware.isLogged, userController.profile);
router.post('/profile', authMiddleware.isLogged, csrfMiddleware.validateCsrf, userController.profileAction);

router.post('/profile/password', authMiddleware.isLogged, csrfMiddleware.validateCsrf, authMiddleware.changePassword)

router.get('/post/add', authMiddleware.isLogged, postController.add);
router.post('/post/add',
    authMiddleware.isLogged,
    imageMiddleware.upload,
    csrfMiddleware.validateCsrf,
    imageMiddleware.resize,
    postController.addAction
);

router.get('/post/:slug/edit',authMiddleware.isLogged, postController.edit);
router.post('/post/:slug/edit',
    authMiddleware.isLogged,
    imageMiddleware.upload,
    csrfMiddleware.validateCsrf,
    imageMiddleware.resize,
    postController.editAction
);

router.get('/post/:slug', postController.view);

module.exports = router;
