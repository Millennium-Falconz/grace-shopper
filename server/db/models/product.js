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
    // money/currency type? float?
    type: Sequelize.INTEGER,
    isNull: false,
    validate: {
      notEmpty: true,
    },
  },
  type: {
    type: Sequelize.ENUM(
      "bug",
      "dragon",
      "fairy",
      "fire",
      "ghost",
      "ground",
      "normal",
      "psychic",
      "steel",
      "dark",
      "electric",
      "fighting",
      "flying",
      "grass",
      "ice",
      "poison",
      "rock",
      "water"
    ),
    defaultValue: "normal",
    isNull: false,
    validate: {
      notEmpty: true,
    },
  },
  imageURL: {
    type: Sequelize.TEXT,
    defaultValue:
      "data:image/png;base64,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",
  },
  pokedexID: {
    type: Sequelize.INTEGER,
    isNull: false,
    validate: {
      notEmpty: true,
    },
  },
});

module.exports = Product;
