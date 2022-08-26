const router = require('express').Router();
const productController = require('../controllers/product');
const { verifyTokenAndAdmin } = require('../middleware/verifyToken');

router.post('/', verifyTokenAndAdmin, productController.create);

router.put('/:id', verifyTokenAndAdmin, productController.productUpdate);

router.delete('/:id', verifyTokenAndAdmin, productController.ProductDelete);

router.get('/find/:id', productController.getProdctt);

router.get('/', productController.productGetAll);

module.exports = router;
