const router = require('express').Router()
const Series = require('../models/series')

const publicKeys = '_id title start_year season_count characters'

router.get('/', async (req, res, next) => {
  const status = 200
  const response = await Series.find(req.query).select(publicKeys)  
  res.json({ status, response })
})

router.post('/', async (req, res, next) => {
  const status = 201
  try {
    const series = await Series.create(req.body)
    const response = await Series.findById(series._id).select(publicKeys)

    res.json({ status, response })  
  } catch (error) {
    error.status = 400
    error.message = 'Invalid data. Please check your POST body and try again.'
    
    next(error)
  }
})

router.get('/:id', async (req, res, next) => {
  const status = 200
  const response = await Series.findById(req.params.id).select(publicKeys)

  res.json({ status, response })
})

router.put('/:id', async (req, res, next) => {
  const status = 200
  const query = { _id: req.params.id }
  const options = { new: true }
  const response = await Series.findOneAndUpdate(query, req.body, options).select(publicKeys)
  
  res.json({ status, response })
})

router.delete('/:id', async (req, res, next) => {
  const status = 200
  
  const query = { _id: req.params.id }
  const response = await Series.findOneAndDelete(query, req.body).select(publicKeys)

  res.json({ status, response })
})

module.exports = router