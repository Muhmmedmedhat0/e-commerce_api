const router = require('express').Router();
const paymentController = require('../controllers/stripe');

// /api/payment => POST
router.post('/', paymentController.postPayment);
module.exports = router;
