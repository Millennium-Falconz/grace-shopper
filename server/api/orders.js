const router = require('express').Router();
const {
  models: { Order, Product, OrderItems, User },
} = require('../db');

const { requireToken } = require('./gatekeeper');

router.get('/:orderId', async (req, res, next) => {
  try {
    const item = await Order.findByPk(req.params.orderId);
    item.update({ status: 'paid' });
    // need to send back something??
    res.json(item);
  } catch (err) {
    next(err);
  }
});

router.get('/', requireToken, async (req, res, next) => {
  try {
    // console.log('user: ', req.user)
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
      console.log('requireToken: ', requireToken);
      console.log('userId: ', req.user.id)
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
router.put('/:productId/:orderId/plus', async (req, res, next) => {
  console.log('ADD')
  try {
    const itemToIncrease = req.params;
    const  item = await OrderItems.findOne({
      where: {
        productId: itemToIncrease.productId,
        orderId: itemToIncrease.orderId,
      },
    });
    res.json(await item.increment('quantity'))
    ;
    // some how have to add in quantity to change it
  } catch (err) {
    next(err);
  }
});


router.put('/:productId/:orderId/minus', async (req, res, next) => {

  try {
    const itemToIncrease = req.params;
    const  item = await OrderItems.findOne({
      where: {
        productId: itemToIncrease.productId,
        orderId: itemToIncrease.orderId,
      },
    });
    if (item.quantity === 1) {
      await item.destroy()
      res.sendStatus(200)
    } else {
      res.json(await item.decrement('quantity'))
    }
    
    // some how have to add in quantity to change it
  } catch (err) {
    next(err);
  }
});
//when you want to delete an item from your cart
router.delete('/:productId/:orderId', async (req, res, next) => {
  console.log('DELETE');
  try {
    const deletingItem = req.params;
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
