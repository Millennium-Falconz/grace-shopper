const Sequelize = require("sequelize");
const db = require("../db");

const Product = db.define("product", {
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
    // defaultValue: 'https://tinyurl.com/fp2kd4ry',
  },
  pokedexID: {
    type: Sequelize.INTEGER,

    // isNull: false,
    // validate: {
    //   notEmpty: true,S
    // },
  },
  quantity: {
    type: Sequelize.INTEGER,
    // i'm setting default value to one because adding/removing should affect only one product at a time - UNSURE IF THIS IS THE WAY TO GO
    defaultValue: 1,
  },
});

module.exports = Product;
