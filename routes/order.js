const router = require('express').Router();
const orderController = require('../controllers/order');
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require('../middleware/verifyToken');

// /api/orders => POST
router.post('/', verifyToken, orderController.create);

// /api/orders/:id => =>PUT
router.put('/:id', verifyTokenAndAdmin, orderController.orderUpdate);

// /api/orders/:id => =>DELETE
router.delete('/:id', verifyTokenAndAdmin, orderController.orderDelete);

// /api/orders/find/:id => GET
router.get(
  '/find/:userId',
  verifyTokenAndAuthorization,
  orderController.getOrders
);

// /api/orders => GET
router.get('/', verifyTokenAndAdmin, orderController.getAllOrders);

// /api/orders/income => GET
router.get('/income', verifyTokenAndAdmin, orderController.getIncome);

module.exports = router;
