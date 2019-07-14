const router = require('express').Router()
const { generate: generateId } = require('shortid')
const Series = require('../models/series')

const series = [{
  id: "j9U3iNIQi",
  name: "Buffy the Vampire Slayer"
}];

router.get('/', async (req, res, next) => {
  const status = 200

  // if (!query) {
  //   const response = await Series.find().select('_id title season_count start_year')
  //   res.json({ status, response })
  // } else {
    const response = await Series.find(req.query).select('_id title season_count start_year characters')
    res.json({ status, response })
  // }
})

router.post('/', async (req, res, next) => {
  const status = 201
  // const response = await Series.create({ 
  //   title: 'The West Wing',
  //   start_year: 1999,
  //   season_count: 8
  // })
  Series.create(req.body).then(response => {
    res.json({ status, response })
  }).catch(error => {
    console.error(error)
    const e = new Error('Something went bad')
    e.status = 400
    next(e)
  })
})

router.get('/:id', async (req, res, next) => {
  const id = req.params.id
  const status = 200
  const response = await Series.findOne({ _id: id })
  // OR: const response = await Series.find({ _id: req.params.id }) with no const id above
  // OR: const response = await Series.find({ _id: req.params.id })

  res.json({ status, response })
})

router.put('/:id', async (req, res, next) => {
  const status = 201
  // const response = { id: req.params.id, ...req.body }
  // const single = series.find(({ id }) => id === req.params.id)
  // const index = series.indexOf(single)
  // series.splice(index, 1, response)

  const response = await Series.findOneAndUpdate({ 
    _id: req.params.id 
  }, { 
    title: req.body.title,
    season_count: req.body.season_count,
    start_year: req.body.start_year,
    characters: req.body.characters
  }, { 
    new: true 
  })
  
  res.json({ status, response })
})

router.delete('/:id', async (req, res, next) => {
  const status = 200
  // const response = series.find(({ id }) => id === req.params.id)
  // const index = series.indexOf(response)
  // series.splice(index, 1)

  const response = await Series.findOneAndDelete({ _id: req.params.id })

  res.json({ status, response })
})

module.exports = router