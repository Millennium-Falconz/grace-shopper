const express = require("express");
const router = express.Router();
module.exports = router;
const {
  models: { User, Order },
} = require("../db");
const { requireToken } = require("../api/gatekeeper");

router.post("/login", async (req, res, next) => {
  try {
    res.send({ token: await User.authenticate(req.body) });
  } catch (err) {
    next(err);
  }
});

router.post("/signup", async (req, res, next) => {
  console.log("express auth in signup");
  try {
    const { username, password, firstname, lastname } = req.body;
    const user = await User.create({ username, password, firstname, lastname });
    res.send({ token: await user.generateToken() });
  } catch (err) {
    if (err.name === "SequelizeUniqueConstraintError") {
      res.status(401).send("User already exists");
    } else {
      next(err);
    }
  }
});

router.get("/me", requireToken, async (req, res, next) => {
  try {
    res.send(await User.findByToken(req.headers.authorization));
  } catch (ex) {
    next(ex);
  }
});

router.get("/", requireToken, async (req, res, next) => {
  console.log("in auth router.get /");
  try {
    const users = await User.findAll({
      attributes: ["id", "username"],
    });
    if (req.user) {
      res.send(users);
    } else {
      res.sendStatus(401);
    }
  } catch (error) {
    next(error);
  }
});

//make auth for orders when its created
