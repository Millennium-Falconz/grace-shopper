const router = require("express").Router();
const Product = require("../db/models/product");
const User = require("../db/models/user");
const {requireToken, isAdmin} = require('./gatekeeper')

router.get("/", async (req, res, next) => {
  console.log("router.get allPokemon");
  try {
    const allPokemon = await Product.findAll();
    res.json(allPokemon);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  console.log("router.get singlePokemon");
  try {
    const singlePokemon = await Product.findByPk(req.params.id);
    res.json(singlePokemon);
  } catch (err) {
    next(err);
  }
});
router.post("/",requireToken, isAdmin, async (req, res, next) => {
  try {
    res.status(201).json(await Product.create(req.body))
  } catch (err) {
    next(err);
  }
});
router.put("/:id", requireToken , isAdmin, async (req, res, next) => {
  try {
    const pokemon = await Product.findByPk(req.params.id);
    const poke = pokemon.update(req.body)
    res.json(poke);
    
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", requireToken, isAdmin, async (req, res, next) => {
  try {
    const pokemon = await Product.findByPk(req.params.id);
      await pokemon.destroy()
      res.sendStatus(204)
  } catch (err) {
    next(err);
  }
});

// router.post("/:id", async (req, res, next) => {
//   try {
//     const addingItemToCart = req.params.id;
//     console.log("req.body", req.body);
//     console.log("req.params: ", req.params);
//     console.log("req.user.id: ", req.user.id);
//     const newOrder = await Order.create({
//       status: "in cart",
//       userId: req.user.id,
//     });
//     newOrder.addProduct(addingItemToCart);
//     res.json(newOrder);
//   } catch (err) {
//     next(err);
//   }
// });

module.exports = router;
