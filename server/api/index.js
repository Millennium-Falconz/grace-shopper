const router = require("express").Router();
router.use("/cart", require("./orders"));
router.use("/users", require("./users"));
router.use("/pokemon", require("./products"));
router.use("/payment", require("./payment"));

router.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});
module.exports = router;
