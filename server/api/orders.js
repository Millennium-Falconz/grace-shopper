const router = require('express').Router();
const {
  models: { Order, Product, OrderItems, User },
} = require('../db');

const { requireToken } = require('./gatekeeper');

router.get('/', requireToken, async (req, res, next) => {
  try {
    const cart = await Order.findOne({
      include: [
        {
          model: Product,
          through: 'orderItems',
          attributes: ['price', 'id', 'name', 'imageURL'],
        },
      ],
      where: {
        status: 'in cart',
        userId: req.user.id,
      },
      attributes: ['id', 'userId'],
    });
    if (!cart) {
      let err = new Error('Your cart is currently empty! Start shopping!');
      next(err);
    } else {
      res.json(cart);
    }
  } catch (err) {
    next(err);
  }
});

router.post('/:productId', requireToken, async (req, res, next) => {
  //step1: assuming the cart is empty
  //post route: creating an order
  //-> check if theres a cart -> cart = Order.findAll / one (where {status is in cart}) [ x ]
  //-> first need userId [ x ]
  //-> access productId (attach productId) using req.params (unless it works with userId) [ x ]
  //-> to find product use .find() [ x ]
  //-> create an order where the user is the user we received [ x ]
  //-> But next time there IS an item you can search for order 'incart' [ x ]
  //-> if there IS a cart: chaeck if item is already in the cart then you would motify the qnty [ x ]
  try {
    const pokemonIdToAdd = req.params.productId; //product from single pokemon view {current item}
    let cart = await Order.findOne({
      where: {
        status: 'in cart',
        userId: req.user.id,
      },
    });
    // if there is Nothin in the cart then we create and order with the status 'in cart'
    if (!cart) {
      cart = await Order.create({
        userId: req.user.id,
      });
    }
    // checkin to see if the specific product is in cart; whats in the cart
    let currentItem = await OrderItems.findOne({
      where: {
        productId: pokemonIdToAdd,
        orderId: cart.id,
      },
    });
    //if product is already in the cart then we increase qnty
    if (currentItem) {
      let updateQnty = currentItem.quantity + 1;
      currentItem.update({
        quantity: updateQnty,
      });
    } else {
      //its not in the cart
      const product = await Product.findByPk(pokemonIdToAdd);
      const pokePrice = product.price;
      let pokemonInfo = await Product.findByPk(pokemonIdToAdd);
      currentItem = await OrderItems.create({
        quantity: 1,
        productId: pokemonIdToAdd,
        orderId: cart.id,
        price: pokePrice,
      });
      res.json({ pokemonInfo, quantity: currentItem.quantity });
    }
  } catch (error) {
    next(error);
  }
});
// when you have to change an item in the cart(like the quantity)
router.put('/', async (req, res, next) => {
  try {
    const itemToChange = req.body;
    const item = await OrderItems.findOne({
      where: {
        productId: itemToChange.productId,
        orderId: itemToChange.orderId,
      },
    });
    // some how have to add in quantity to change it
  } catch (err) {
    next(err);
  }
});

// TEMP FOR TESTING REMOVE TO AVOID CONFLICT
router.put('/order_status', async (req, res, next) => {
  try {
    const { orderId, status } = req.body;
    const item = await OrderItems.findOne({
      where: {
        orderId: orderId,
      },
    });
    item.update({ status: status });
  } catch (err) {
    next(err);
  }
});

//when you want to delete an item from your cart
router.delete('/:productId/:orderId', async (req, res, next) => {
  try {
    const deletingItem = req.params;
    console.log('BODY', req.params);
    await OrderItems.destroy({
      where: {
        productId: deletingItem.productId,
        orderId: deletingItem.orderId,
      },
    });
    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
});
module.exports = router;
