const router = require('express').Router();
if (process.env.NODE_ENV !== 'production') require('../secrets.js');
const stripeKey = process.env.STRIPE_API_KEY;
const stripe = require('stripe')(stripeKey);

// const {
//   models: { Order },
// } = require('../db/');
// const {
//   models: { OrderItems },
// } = require('../db/');
// const {
//   models: { User },
// } = require('../db/');
// const {
//   models: { Product },
// } = require('../db/');
const {
  models: { Product, User, Order, OrderItems },
} = require('../db');

// justs to test the routes and that we're getting the env vars
router.get('/public_keys', (req, res) => {
  res.json('Nothing to see here... Or is there?');
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
  try {
    // const frodo = await User.findOrCreate({
    //   username: 'Frodo',
    //   password: 'frodo',
    //   type: 'user',
    //   email: 'f@b.com',
    // });

    const result = await Order.findOrCreate({
      where: {
        status: 'in cart',
        userId: 1,
      },
      include: [{ model: OrderItems }],
    });
    const newOrder = result[0];
    // await frodo.addOrder(newOrder);
    // const item1 = await OrderItems.create({
    //   orderId: 1,
    //   productId: 23,
    //   price: 2000,
    //   quantity: 2,
    // });
    // const item2 = await OrderItems.create({
    //   orderId: 2,
    //   productId: 18,
    //   price: 1250,
    //   quantity: 1,
    // });
    // await newOrder.addOrderItem(item2);
    const r = Math.random() * 100;
    const testProduct = await Product.create({
      name: 'TestItem' + r,
      price: 1250,
      types: ['grass', 'monkey'],
    });
    await newOrder.addProduct(13, { through: {} });
    console.log('id', newOrder.userId, newOrder.status);
    console.log('order', newOrder);
    console.log('items', newOrder.orderItems);

    // console.log('userId, newOrder:', newOrder.userId, newOrder);
    // 4242 4242 4242 4242
    // console.log('O', Object.values(Order.__proto__));
    // console.log('OI', Object.keys(OrderItem.__proto__));
    // console.log('assoc', Object.__proto__.getAssociations());
    // console.log(OrderItem.__proto__);

    // const amount = calculateOrderAmount(newOrder.orderItems);
    // have to query for order items associated with that id.

    console.log('api/payment', req.body, paymentId);
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 10000,
      currency: 'usd',
      payment_method: paymentId,
      confirm: true,
    });
    res.send(paymentIntent);
  } catch (error) {
    console.error('Error with our fake payment data:', error);
    // console.log('paymentIntent', paymentIntent);
  }
});

// not sure we need this. Or even how to trigger it...
router.post('/webhook', (req, res) => {
  const event = req.body;
  console.log('STRIPE WEBHOOK', event);
});
module.exports = router;
