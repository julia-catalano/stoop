const router = require('express').Router()
const Cat = require('../db/models/cat')
module.exports = router

router.post('/', async (req, res, next) => {
  try {
    const cat = await Cat.create({
      name: req.body.name,
      time: req.body.time,
      latitude: req.body.latitude,
      longitude: req.body.longitude,
      imageUrl: req.body.imageUrl
    })
    res.json(cat)
  } catch (error) {
    next(error)
  }
})
