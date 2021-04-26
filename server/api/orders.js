const router = require("express").Router();
const Order = require("../db/models/order");
const Product = require("../db/models/product");
const OrderItems = require("../db/models/orderItems");
const { requireToken } = require("./gatekeeper");

router.get("/", async (req, res, next) => {
  try {
    const cart = await Order.findOne({
      include: [
        {
          model: Product,
          through: "orderItems",
        },
      ],
      where: {
        status: "in cart",
        userId: req.user.id,
      },
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
    console.log("body", req.body);
    // console.log("req", req);
    console.log("req.params: ", req.params);
    console.log("req.user.id: ", req.user.id);
    // const newOrder = await Order.create({
    //   status: "in cart",
    //   userId: req.user.id,
    // });
    // newOrder.addProduct(addingItemToCart);
    // res.json(newOrder);
    // const cart = await Order.findOrCreate({
    //   where: {
    //     status: "in cart",
    //     userId: req.user.id,
    //   },
    // });
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
