const Sequelize = require('sequelize');
const db = require('../db');

const Product = db.define('product', {
  name: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  description: {
    type: Sequelize.TEXT,
  },
  price: {
    // money/currency type? float?
    type: Sequelize.INTEGER,
    // isNull: false,
    // validate: {
    //   notEmpty: true,
    // },
  },
  types: {
    type: Sequelize.ARRAY(Sequelize.STRING),
    defaultValue: [],
    isNull: false,
    validate: {
      notEmpty: true,
    },
  },
  imageURL: {
    type: Sequelize.TEXT,
    defaultValue: 'https://tinyurl.com/fp2kd4ry',
  },
  pokedexID: {
    type: Sequelize.INTEGER,
    // isNull: false,
    // validate: {
    //   notEmpty: true,
    // },
  },
});

module.exports = Product;
