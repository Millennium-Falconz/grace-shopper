const router = require('express').Router()
const Product = require('../db/models/product')


router.get('/', async (req,res,next) => {
try {
    const allPokemon = await Product.findAll()
 res.json(allPokemon)
} catch (err){
    next(err)
}
})
module.exports = router