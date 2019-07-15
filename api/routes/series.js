const router = require('express').Router()
const { generate: generateId } = require('shortid')
const Series = require('../models/series.js')

router.get('/:id/', async (req, res, next) => {
  const status = 200
  const response = await Series.find().select('characters')
  
  res.json({ status, response })
})

router.get('/', async (req, res, next) => {
  const status = 200
  const response = await Series.find().select('_id title season_count start_year')
  //const response = await Series.find({ start_year: {$eq:1980}}).select('_id title season_count start_year')
  
  res.json({ status, response })
})

router.post('/', async (req, res, next) => {
  const status = 201
try {
  const response = await Series.create(req.body)
  res.json({ status, response })
}
catch {
const status = 404
const response = "Please complete required fields"
res.json({ status, response })
}

})

router.get('/:id', async (req, res, next) => {
  const status = 200
  const response = await Series.findById(req.params.id);

  res.json({ status, response })
})

router.put('/:id', async (req, res, next) => {
  const status = 200
  const response = await Series.findOneAndUpdate({_id: req.params.id}, {"name": req.body.name} , {new: true});
  
  res.json({ status, response })
})

router.delete('/:id', async (req, res, next) => {
  const status = 200
  const response = await Series.findOneAndDelete({_id: req.params.id});


  res.json({ status, response })
})

module.exports = router