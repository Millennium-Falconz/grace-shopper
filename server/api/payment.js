const router = require('express').Router();
if (process.env.NODE_ENV !== 'production') require('../secrets.js');
const stripeKey = process.env.STRIPE_API_KEY;
const stripe = require('stripe')(stripeKey);

// justs to test the routes and that we're getting the env vars
router.get('/public_keys', (req, res) => {
  res.send(process.env.STRIPE_PUBLIC_KEY);
});

const calculateOrderAmount = (items) => {
  /*
  Note: calculating the order amount here on the server to
  prevent people from manipulating the amount on the
  client

  Note 2: Amounts are in cents, due to the
  javascript float approximating issue
  */

  // dummy value for now.
  return 1400;
};

// our payment endpoint
router.post('/create-payment-intent', async (req, res) => {
  const { items } = req.body;
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(items),
    currency: 'usd',
  });
  res.send({ clientSecret: paymentIntent.clilent_secret });
});

module.exports = router;
