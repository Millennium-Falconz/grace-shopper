const router = require('express').Router();
if (process.env.NODE_ENV !== 'production') require('../secrets.js');
const stripeKey = process.env.STRIPE_API_KEY;
const stripe = require('stripe')(stripeKey);

const Order = require('../db/models/order');
const OrderItem = require('../db/models/orderItems');
const User = require('../db/models/user');

// justs to test the routes and that we're getting the env vars
router.get('/public_keys', (req, res) => {
  res.send(process.env.STRIPE_PUBLIC_KEY);
});

const calculateOrderAmount = (items) => {
  /*
  Note: stripe recommends calculating the order amount here
  on the server to prevent people from manipulating the
  amount on the client

  Note 2: Amounts are in cents, due to the javascript float
  approximating issue
  */

  // to calculate this, need access to the OrderItems(?) in the cart
  // dummy value for now.
  return 1400;
};

// our payment endpoint
router.post('/create-payment-intent', async (req, res) => {
  console.log('api/create-payment-intent/post');
  // const { items } = req.body;
  const { orderItems, orderId, paymentId } = req.body;
  // get orderItems from orderId
  // going to fake some for now
  const frodo = await User.create({
    username: 'Frodo',
    password: 'frodo',
    type: 'user',
    email: 'f@b.com',
  });
  const newOrder = await Order.create();
  await frodo.addOrder(newOrder);
  const item1 = OrderItem.create({ productId: 23, price: 2000, qty: 2 });
  const item2 = OrderItem.create({ productId: 23, price: 2000, qty: 2 });
  await order.addOrderItems([item1, item2]);
  console.log('frodo, newOrder:', frodo, newOrder);
  const amount = calculateOrderAmount(order.orderItems);

  console.log('api/payment', req.body, amount, paymentId);
  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount,
    currency: 'usd',
    payment_method: paymentId,
    confirm: true,
  });
  // console.log('paymentIntent', paymentIntent);
  // res.send({ clientSecret: paymentIntent.clilent_secret });
  res.send(paymentIntent);
});

// not sure we need this. Or even how to trigger it...
router.post('/webhook', (req, res) => {
  const event = req.body;
  console.log('STRIPE WEBHOOK', event);
});
module.exports = router;
