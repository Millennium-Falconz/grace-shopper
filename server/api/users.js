const router = require('express').Router()
const { models: { User }} = require('../db')
module.exports = router

const requireToken = async(req,res,next) => {
  try {
    const token = req.headers.authorization;
    const user = await User.findByToken(token)
    req.user = user
    next()
  } catch (error) {
    next(error)
  }
}

router.get('/', requireToken, async (req,res,next) => {
  try {
    const users = await User.findAll({

      attributes: ['id', 'username']
    })
    if(req.user){
      res.send(users)
    } else {
      res.sendStatus(401)
    }
  } catch (error) {
    next(error)
  }
})