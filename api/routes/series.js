const router = require('express').Router()
const { generate: generateId } = require('shortid')
const Series = require('../models/series')

const series = [{
  id: "j9U3iNIQi",
  name: "Buffy the Vampire Slayer"
}, {
  id: "some stuff",
  name: "Stranger Things"
}];

router.get('/', async (req, res, next) => {
  //console.log(Series.find())
  const status = 200
  const response = await Series.find()
  
  res.json({ status, response })
  
})

router.post('/', async (req, res, next) => {
  const status = 201

  //const response = await Series.create({
  //  title: 'Stranger Things',  
  //  start_year: 2016,
  //  season_count: 3
  // })

  Series.create(req.body).then(response => {
    res.json({status, response})
  }).catch(error => {
    console.error(error)
    const e = new Error('Something Went Bad')
    e.status = 400
    next(e)
  })

})

router.get('/:id', async (req, res, next) => {
  const status = 200
  //const response = series.find(({ id }) => id === req.params.id)
  const response = await Series.findById(req.params.id)
  res.json({ status, response })
})

router.get('/:id/characters', async (req, res, next) => {
  const status = 200
  //const response = series.find(({ id }) => id === req.params.id)
  const response = await Series.characters.findById(req.params.id)
  res.json({ status, response })
})


router.put('/:id', async (req, res, next) => {
  const status = 200
  const response = await Series.findOneAndUpdate({
    _id: req.params.id
  }, {
    title: req.body.title
  })
  
  res.json({ status, response })

})

router.delete('/:id', async (req, res, next) => {
  const status = 200
  const response = await Series.findByIdAndDelete({ _id: req.params.id })

  res.json({ status, response })
})

module.exports = router