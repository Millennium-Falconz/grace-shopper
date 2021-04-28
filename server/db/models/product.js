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
    defaultValue: ['grass'],
    isNull: false,
    validate: {
      notEmpty: false,
    },
  },
  imageURL: {
    type: Sequelize.TEXT,
    defaultValue: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/12ecb7ae-7059-48df-a4f8-2e3fb7858606/d47rmjf-de88a574-49c8-4dcf-9df4-7e11722e8bec.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOiIsImlzcyI6InVybjphcHA6Iiwib2JqIjpbW3sicGF0aCI6IlwvZlwvMTJlY2I3YWUtNzA1OS00OGRmLWE0ZjgtMmUzZmI3ODU4NjA2XC9kNDdybWpmLWRlODhhNTc0LTQ5YzgtNGRjZi05ZGY0LTdlMTE3MjJlOGJlYy5wbmcifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6ZmlsZS5kb3dubG9hZCJdfQ.SU2b46-uLymQV10qRWry5H58_D-U4_IjxvGyzI9yfZI',
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
    defaultValue: 100,
  },
});

module.exports = Product;
