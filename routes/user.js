const router = require('express').Router();
const usrController = require('../controllers/user');
const {
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require('../middleware/verifyToken');

// /api/users/:id =>PUT
router.put('/:id', verifyTokenAndAuthorization, usrController.userUpdate);

// /api/users/:id =>DELETE
router.delete('/:id', verifyTokenAndAuthorization, usrController.userDelete);

// /api/users/ =>GET
router.get('/', verifyTokenAndAdmin, usrController.userGetAll);

// /api/status/ =>GET
router.get('/status', verifyTokenAndAdmin, usrController.userStatus);
module.exports = router;
