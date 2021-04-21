const Sequelize = require("sequelize");
const db = require("../db");

const User = require("./user");

const Order = db.define("order", {
  //userID needs to go there, but we think it's coming from associations
  value: {
    type: Sequelize.INTEGER,
    isNull: false,
  },
  status: {
    type: Sequelize.ENUM("processing", "shipped"),
    defaultValue: "processing",
  },
  // could go with timestamp, testing this out
  orderDate: {
    type: Sequelize.DATE,
    isNull: false,
  },
});

module.exports = Order;
