const router = require('express').Router();
const authCtrl = require('../controllers/auth_ctrl');

// /rigister =>POST
router.post('/register', authCtrl.register);

// /login =>POST
router.post('/login', authCtrl.login);

module.exports = router;
