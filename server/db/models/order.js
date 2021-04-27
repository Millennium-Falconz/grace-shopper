const Sequelize = require("sequelize");
const db = require("../db");
const { models: {OrderItems} } = require('../db')

// const User = require("./user");

const Order = db.define("order", {
  // //userID needs to go there, but we think it's coming from associations - it is.
  // value: {
  //   type: Sequelize.INTEGER,
  //   isNull: false,
  // },
  status: {
    // here - do we need abandoned as a status?
    type: Sequelize.ENUM("in cart", "paid", "shipped", "refunded"),
    defaultValue: "in cart",
  },
});


// Order.findOrderItems = async (orderId) => {
//   const orderItems = await Order.findByPk(orderId,
//     {include: [{model: OrderItems}]}
//   )
//   return orderItems
// }

module.exports = Order;
