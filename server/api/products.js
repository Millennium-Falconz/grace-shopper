const router = require("express").Router();
const Product = require("../db/models/product");
const User = require("../db/models/user")

router.get("/", async (req, res, next) => {
  try {
    const allPokemon = await Product.findAll();
    res.json(allPokemon);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const singlePokemon = await Product.findByPk(req.params.id);
    res.json(singlePokemon);
  } catch (err) {
    next(err);
  }
});
module.exports = router;
