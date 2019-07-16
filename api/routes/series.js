const router = require('express').Router()
const { generate: generateId } = require('shortid')
const Series = require('../models/series')

const series = [{
  id: "j9U3iNIQi",
  name: "Buffy the Vampire Slayer"
}];

router.get('/', async (req, res, next) => {
  const status = 200
  let response
  if (req.query) {
    // Only accepts exact matches currently
    response = await Series.find(req.query)
  } else {
    response = await Series.find()
  }
  
  
  res.json({ status, response })
})

router.post('/', async (req, res, next) => {
  const status = 201
  
  const response = await Series.create(req.body)
    .then(response => {
      res.json({ status, response })
    })
    .catch(err => {
      res.json(err.message)
    })
})

router.get('/:id', async (req, res, next) => {
  const status = 200
  const response = await Series.findById(req.params.id).select('_id title start_year season_count')
  res.json({ status, response })
})

router.put('/:id', async (req, res, next) => {
  const status = 200
  const response = await Series.findOneAndUpdate({
    _id: req.params.id
  },{
    ...req.body
  }, {
    new: true
  })
  res.json({ status, response })
})

router.delete('/:id', async (req, res, next) => {
  const status = 200
  const response = await Series.findOneAndDelete({
    _id: req.params.id
  })
  res.json({ status, response })
})

router.get('/:id/characters', async (req, res, next) => {
  const status = 200
  const response = await Series.findById(req.params.id)
  const characters = response.characters; 
  res.json({ status, characters })
})

router.put('/:id/characters', async (req, res, next) => {
  const status = 200
  const response = await Series.findOneAndUpdate({
    _id: req.params.id
  },{
    ...req.body.characters
  }, {
    new: true
  })
  res.json({ status, response })
})

router.delete('/characters/:CharacterId', async (req, res, next) => {
  const status = 200
  const response = await Series.findOneAndDelete({
    _id: req.params.id
  })
  res.json({ status, response })
})
module.exports = router