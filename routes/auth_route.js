const router = require('express').Router();
const authCtrl = require('../controllers/auth_ctrl');

// /rigister =>POST
router.post('/register', authCtrl.register);

module.exports = router;
