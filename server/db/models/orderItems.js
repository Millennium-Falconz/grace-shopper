const Sequelize = require("sequelize");
const db = require("../db");

const OrderItems = db.define("orderItems", {
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
});
module.exports = OrderItems;
