//this is the access point for all things database related!

const db = require('./db');

const User = require('./models/user');
const Product = require('./models/product');
const Order = require('./models/order');
const OrderItems = require('./models/orderItems');
//associations could go here!

/*
USERS -> users have many orders. 
orders -> belong to one user
(many to 1 relationship)

many to many THRU order_items 
ORDERS -> have many products 
products belong to many orders

*/

User.hasMany(Order);
Order.belongsTo(User);

Product.belongsToMany(Order, { through: 'orderItems' });
Order.belongsToMany(Product, { through: 'orderItems' });
Order.hasMany(OrderItems);

module.exports = {
  db,
  models: {
    User,
    Product,
    Order,
    OrderItems,
  },
};
