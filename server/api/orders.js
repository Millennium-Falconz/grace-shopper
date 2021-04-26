const router = require("express").Router();
const { models: { Order, Product, OrderItems, User} } = require("../db");
// const Product = require("../db");
// const OrderItems = require("../db");
const { requireToken } = require("./gatekeeper");

router.get("/", requireToken, async (req, res, next) => {
  try {
    
    const cart = await Order.findAll({
      where: {
        status: "in cart",
        userId: req.user.id
      },
      include: [
        {
          model: Product,
          through: 'orderItems'
        }
      ]
    });
    if (!cart) {
      let err = new Error("Your cart is currently empty! Start shopping!");
      next(err);
    } else {
      res.json(cart);
    }
  } catch (err) {
    next(err);
  }
});
//when you have to add an item to cart
router.post("/", requireToken, async (req, res, next) => {
  try {
    const addingItemToCart = req.body;
    const newOrder = await Order.findOrCreate({
      where: {
      status: "in cart",
      userId: req.user.id,
    }
    
  });
  let currItem = await OrderItems.findOne({
    where : {
      productId: addingItemToCart.id
    }
  })
    console.log("HIII", req.body)
    // const productInfo = await Product.findByPk(req.body.id)

    await newOrder.addProduct(addingItemToCart, 
      {through: {quantity: 1, price: req.body.price}});

    const order = await Order.findByPk(newOrder.id,
        {include: [{model: OrderItems}]}
      )
    const cartItems = order.orderItems
    res.send(cartItems);
    // const cart = await Order.findOrCreate({
    //   where: {
    //     status: "in cart",
    //     userId: req.user.id,
    //   },
    // });
    // res.json(newOrder);
    //have to change the quantity as well
  } catch (err) {
    next(err);
  }
});

// when you have to change an item in the cart(like the quantity)
router.put("/", async (req, res, next) => {
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
//when you want to delete an item from your cart
router.delete("/", async (req, res, next) => {
  try {
    const deletingItem = req.body;
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
