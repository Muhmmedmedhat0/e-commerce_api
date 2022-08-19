const stripe = require('stripe')(process.env.STRIPE_KEY);

// post payment
exports.postPayment = async (req, res) => {
  // charge the user with the amount of the order
  stripe.charges.create(
    {
      source: req.body.tokenId,
      amount: req.body.amount,
      currency: 'usd',
    },
    (stripeErr, stripeRes) => {
      if (stripeErr) {
        res.status(500).json(stripeErr);
      } else {
        res.status(200).json(stripeRes);
      }
    }
  );
};
