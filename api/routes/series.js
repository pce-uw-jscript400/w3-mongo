// creating a router
// tool that express gives us that allows us to separate routes
// in different files
const router = require('express').Router()
const { generate: generateId } = require('shortid')
const Series = require('../models/series')

const series = [{
  id: "j9U3iNIQi",
  name: "Buffy the Vampire Slayer"
}];

router.get('/', async (req, res, next) => {
  const status = 200
  // const response = series
  // to exclude do a dash '-_id'
  // console.log(req.params.length)
  const response = await Series.find(({...req.query})).select('_id title start_year season_count characters image_url')
  res.json({ status, response })

  // Series.find().then(response =>{
  //   res.json({ status, response })
  // })
})

router.post('/', async (req, res, next) => {
  const status = 201

  try {
    series.push({ id: generateId(), ...req.body })
    // const { title, start_year, season_count } = req.body
    const response = await Series.create(
      req.body
    )
    // if we wanted to return  only specific fields we can
    // filter from the response
    // const title = response['title']
    // res.json({ status, title })
    res.json({ status, response })
  }  catch (error)  {
      console.log(error.errors)
      const e = new Error(error)
      e.status = 400
      next(e)
  }

  // Series.create({
  //   title: 'Stranger Thangs',
  //   start_year: 2016,
  //   season_count: 3
  // }).then(response => {
  //   res.json({ status, response })
  // }).catch(error => {
  //   const e = new Error('Something went bad')
  //   e.status = 400
  //   next(e)
  // })
})

router.get('/:id/characters', async (req, res, next) => {
  const status = 200
  const response = await Series.findById(req.params.id)
  const characters = response.characters
  res.json({ status, characters })
})

router.get('/:id', async (req, res, next) => {
  const status = 200
  // .find will return array with ID
  const response = await Series.findById(req.params.id)

  // WITH PROMISE
  // Series.findById(req.params.id).then(response => {
  //   res.json({ status, response })
  // })

  res.json({ status, response })
})

router.put('/:id', async (req, res, next) => {
  const status = 200
  // const { id } = req.params
  // const response = { id: req.params.id, ...req.body }
  // const single = series.find(({ id }) => id === req.params.id)
  // const index = series.indexOf(single)

  // series.splice(index, 1, response)

  // making an  update but returning old version of update
  const response = await Series.findOneAndUpdate({
    _id: req.params.id },
    { title: req.body.title },
    { new: true })
  res.json({ status, response })
})

router.delete('/:id', async (req, res, next) => {
  const status = 200
  // const response = series.find(({ id }) => id === req.params.id)
  // const index = series.indexOf(response)

  // series.splice(index, 1)
  const response = await Series.findOneAndDelete({
    _id: req.params.id
  })
  res.json({ status, response })
})

module.exports = router