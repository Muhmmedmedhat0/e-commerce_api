const router = require('express').Router();
const productController = require('../controllers/product');
const { verifyTokenAndAdmin } = require('../middleware/verifyToken');

// /api/products => POST
router.post('/', verifyTokenAndAdmin, productController.create);

// /api/products/:id => =>PUT
router.put('/:id', verifyTokenAndAdmin, productController.productUpdate);

// /api/products/:id => =>DELETE
router.delete('/:id', verifyTokenAndAdmin, productController.ProductDelete);

// /api/find/:id => GET
router.get('/find/:id', productController.getProdctt);

// /api/products => GET
router.get('/', productController.productGetAll);

module.exports = router;
