const router = require("express").Router();
const {
  models: { User },
} = require("../db");
const { requireToken, isAdmin } = require("./gatekeeper");

router.get("/", requireToken, isAdmin, async (req, res, next) => {
  console.log("in router.users get / ");
  try {
    //this should only allow admins to see /api/users
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

module.exports = router;
