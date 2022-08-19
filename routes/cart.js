const router = require('express').Router();
const cartController = require('../controllers/cart');
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require('../middleware/verifyToken');

// /api/cart => POST
router.post('/', verifyToken, cartController.create);

// /api/cart/:id => =>PUT
router.put('/:id', verifyTokenAndAuthorization, cartController.CartUpdate);

// /api/cart/:id => =>DELETE
router.delete('/:id', verifyTokenAndAuthorization, cartController.cartDelete);

// /api/find/:id => GET
router.get(
  '/find/:userId',
  verifyTokenAndAuthorization,
  cartController.getCart
);

// /api/cart => GET
router.get('/', verifyTokenAndAdmin, cartController.getAllCarts);

module.exports = router;
