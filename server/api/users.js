const router = require('express').Router()
const { models: { User }} = require('../db')
module.exports = router
const requireToken = async(req,rees,next) => {
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
      // explicitly select only the id and username fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
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