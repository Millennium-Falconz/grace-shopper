const router = require("express").Router();
const {
  models: { User },
} = require("../db");
module.exports = router;

const requireToken = async (req, res, next) => {
  console.log("router.users: in requireToken");
  try {
    const token = req.headers.authorization;
    const user = await User.findByToken(token);
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};
const isAdmin = (req, res, next) => {
  console.log("router.users in isAdmin");
  if (req.user.userType !== "admin") {
    return res.status(403).send("You shall not pass!");
  } else {
    next();
  }
};

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
