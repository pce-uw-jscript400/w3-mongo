const router = require('express').Router()
const { generate: generateId } = require('shortid')
const Series = require ('../models/series.js');

const series = [{
  id: "j9U3iNIQi",
  name: "Buffy the Vampire Slayer"
}];

router.get('/', async (req, res, next) => {
  const startYear = req.query.start_year;
  const status = 200
  if (startYear) { // if query param exists (true)
    const response = await Series.find({start_year: startYear}).select('_id title start_year season_count characters') // filter response results by start year 
    res.json({ status, response })
  } else {
    const response = await Series.find().select('_id title start_year season_count characters') // do not filter, return all
    res.json({ status, response })
  }
})



router.post('/', async (req, res, next) => {
  const status = 201
  try {
    const response = await Series.create(req.body)
    res.json({ status, response })
  } catch (error) {
    console.error(error)
    const e = new Error('Something went bad')
    e.status = 400
    next(e)
  }
  
})

router.get('/:id/characters', async (req, res, next) => {
  const status = 200
  const response = await Series.findById(req.params.id).select('characters')
  res.json({ status, response })
})

router.get('/:id', async (req, res, next) => {
  const status = 200
  const response = await Series.findById(req.params.id).select('_id title start_year season_count characters')
  res.json({ status, response })
})

router.put('/:id', async (req, res, next) => {
  const status = 200
  const response = await Series.findOneAndUpdate({
    _id: req.params.id 
  }, { 
     ...req.body
  }, {
    new: true
  }).select('_id title start_year season_count characters')
  res.json({ status, response })
})

router.delete('/:id', async (req, res, next) => {
  const status = 200
  const response = await Series.findOneAndDelete({ _id: req.params.id }).select('_id title start_year season_count characters')
  res.json({ status, response })
})

module.exports = router