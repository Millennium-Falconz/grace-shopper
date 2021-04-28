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
  // const { items } = req.body;
  try {
    const { amount, id } = req.body;
    console.log('api/payment', req.body);
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 10000,
      currency: 'usd',
      payment_method: id,
      confirm: true,
    });
    // console.log('paymentIntent', paymentIntent);
    // res.send({ clientSecret: paymentIntent.clilent_secret });
    res.send(paymentIntent);
  } catch (err) {
    console.error('Error in payment route.', err);
  }
});

// not sure we need this. Or even how to trigger it...
router.post('/webhook', (req, res) => {
  const event = req.body;
  console.log('STRIPE WEBHOOK', event);
});
module.exports = router;

// const router = require('express').Router();
// if (process.env.NODE_ENV !== 'production') require('../secrets.js');
// const stripeKey = process.env.STRIPE_API_KEY;
// const stripe = require('stripe')(stripeKey);

// // justs to test the routes and that we're getting the env vars
// router.get('/public_keys', (req, res) => {
//   res.send(process.env.STRIPE_PUBLIC_KEY);
// });

// const calculateOrderAmount = (items) => {
//   /*
//   Note: calculating the order amount here on the server to
//   prevent people from manipulating the amount on the
//   client

//   Note 2: Amounts are in cents, due to the
//   javascript float approximating issue
//   */

//   // dummy value for now.
//   return 1400;
// };

// // our payment endpoint
// router.post('/create-payment-intent', async (req, res) => {
//   // const { items } = req.body;
//   const { amount, id } = req.body;
//   console.log('api/payment', req.body, amount, id);
//   const paymentIntent = await stripe.paymentIntents.create({
//     amount: amount,
//     currency: 'usd',
//     payment_method: id,
//     confirm: true,
//   });
//   // console.log('paymentIntent', paymentIntent);
//   // res.send({ clientSecret: paymentIntent.clilent_secret });
//   res.send(paymentIntent);
// });

// // not sure we need this. Or even how to trigger it...
// router.post('/webhook', (req, res) => {
//   const event = req.body;
//   console.log('STRIPE WEBHOOK', event);
// });
// module.exports = router;
