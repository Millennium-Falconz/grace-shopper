const router = require('express').Router();
if (process.env.NODE_ENV !== 'production') require('../secrets.js');
const stripeKey = process.env.STRIPE_API_KEY;
const stripe = require('stripe')(stripeKey);
const {
  models: { Product, User, Order, OrderItems },
} = require('../db');

router.get('/order_total', async (req, res, next) => {
  /*
  Note: stripe recommends calculating the order amount here
  on the server to prevent people from manipulating the
  amount on the client
  
  Note 2: Amounts are in cents, due to the javascript float
  approximating issue
  */

  // to calculate this, need access to the OrderItems(?) in the cart
  // if cart is an array of order items
  // shoot we need to look up the prices right now since they're not in the orderItems table
  const { cart } = req.body;
  let amounts = [];
  try {
    amounts = await Promise.all(
      cart.map(async (orderItem) => {
        const product = await Product.findByPk(orderItem.productId);
        return product.price * orderItem.quantity;
      })
    );

    const total = amounts.reduce((sum, amt) => {
      return sum + amt;
    }, 0);
    res.json(total);
  } catch (err) {
    const error = new Error('Could not calculate order amount.', err);
    next(error);
  }
});

const tempCreateFakeCartData = async () => {
  try {
    const { orderItems, orderId, paymentId } = req.body;
    const result = await Order.findOrCreate({
      where: {
        status: 'in cart',
        userId: 1,
      },
      include: [{ model: OrderItems }],
    });

    // remember findOrCreate returns an array!
    const newOrder = result[0];

    const randomId = Math.round(Math.random() * 100);
    const randomQuant = Math.round(Math.random() * 10);
    await newOrder.addProduct(randomId, { through: { quantity: randomQuant } });
  } catch (error) {
    console.error('Error with our fake order data:', error);
  }
};

// our payment endpoint
router.post('/create-payment-intent', async (req, res) => {
  console.log('api/create-payment-intent/post', req.body);

  try {
    const newOrder = await tempCreateFakeCartData();
    const amount = await calculateOrderAmount(newOrder.orderItems);
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 10000,
      currency: 'usd',
      payment_method: paymentId,
      confirm: true,
    });
    res.send(paymentIntent);
  } catch (error) {
    console.error('Error with stripe payment intent', error);
  }
});

module.exports = router;
