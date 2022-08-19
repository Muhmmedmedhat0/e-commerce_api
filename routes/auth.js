const router = require('express').Router();
const authController = require('../controllers/auth');

// /rigister =>POST
router.post('/register', authController.rigister);

// /login =>POST
router.post('/login', authController.login);

module.exports = router;
