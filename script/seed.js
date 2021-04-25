'use strict';
const axios = require('axios');

const {
  db,
  models: { User, Product },
} = require('../server/db');

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */

const seed = async () => {
  await db.sync({ force: true });
  console.log('db synced');
  console.log('getting data...');
  try {
    // Get a list of Pokemon and make a list of their names
    const { data } = await axios.get(
      'https://pokeapi.co//api/v2/pokemon/?limit=100'
    );
    const allPokemon = data.results;
    const names = allPokemon.map((obj) => obj.name);
    const pokemon = {};

    // for each name, fetch details from api & create an object
    // to add to the database
    names.forEach(async (name) => {
      const url = `https://pokeapi.co/api/v2/pokemon/${name}/`;
      const { data } = await axios.get(url);
      console.log('--------');

      const types = data.types.map((obj) => {
        return obj.type.name;
      });

      pokemon.name = name;
      pokemon.types = types;
      pokemon.price = 100;
      pokemon.description = '';
      pokemon.imageURL = data.sprites.other['official-artwork'].front_default;
      pokemon.quantity = Product.quantity;
      console.log("pokemon", pokemon);

      addToDatabase(pokemon);
    });
  } catch (err) {
    console.error('Error somewhere fetching all this data...', err);
  }
};

const addToDatabase = async (pokemon) => {
  console.log('adding...');
  try {
    await Product.create(pokemon);
  } catch (err) {
    console.error('Problem adding seed object to database', err);
  }
};

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log('runSeed...');
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log('closing db connection');
    // Commenting this for now cuz it's preventing the data from seeding. Will fix later...
    // await db.close();
    console.log('db connection closed');
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
