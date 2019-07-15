const router = require('express').Router()
const { generate: generateId } = require('shortid')
const Series = require('../models/series')

const series = [{
  id: "j9U3iNIQi",
  name: "Buffy the Vampire Slayer"
},
{
  id: "j9432U3iNIQi",
  name: "Stranger Things"
}];

//GET all
router.get('/', async (req, res, next) => {
  const status = 200
  // const response = await Series.find().select('title') //include things
  // const response = await Series.find().select('-_id -__v') //exclude things
  const response = await Series.find().select('_id title start_year season_count') //include multiple things
  res.json({ status, response })
})

//GET start_year filter
// router.get('/', async (req, res, next) => {
//   const status = 200
//   const response = await Series.find({ start_year: req.query.start_year }).select('title start_year')
//   res.json({ status, response })
// })


//other option Promise based

// router.get('/', async (req, res, next) => {
//   const status = 200
//   Series.find().then(response => {
//     res.json({ status, response })
//   })
// })

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
// other option Promise based

  // Series.create(req.body).then(response => {
  //   res.json({ status, response })
  // }).catch(error =>{
  //   console.error(error)
  //   const e = new Error('Something went bad')
  //   e.status = 400
  //   next(e)
  // })
  
})
//GET by ID
router.get('/:id', async (req, res, next) => {
  const status = 200
  // const response = await Series.findOne(_id: req.params.id)
  // const response = await Series.find(_id: req.params.id)
  const response = await Series.findById(req.params.id)
  // Series.findOnefindById(req.params.id).then(response => {
  //   res.json({ status, response })
  // })

  res.json({ status, response })
})

//GET Characters by ID
router.get('/:id/characters', async (req, res, next) => {
  const status = 200
  const series = await Series.findOne({ _id: req.params.id })
  const response =  series.characters
res.json({ status, response })
})

//Update
router.put('/:id', async (req, res, next) => {
  const status = 200
  const response = await Series.findOneAndUpdate({ 
    _id: req.params.id 
  }, { 
    title: req.body.title,
    season_count: req.body.season_count,
    start_year: req.body.start_year,
    characters: req.body.characters
  }, { new: true })

  // const response = { id: req.params.id, ...req.body }
  // const single = await Series.find(({ id }) => id === req.params.id)
  // const index = await Series.indexOf(single)

  // series.splice(index, 1, response)
  
  res.json({ status, response })
})

router.delete('/:id', async (req, res, next) => {
  const status = 200
  const response = await Series.findOneAndDelete({ _id: req.params.id })
 
  // const response = series.find(({ id }) => id === req.params.id)
  // const index = series.indexOf(response)

  // series.splice(index, 1)

  res.json({ status, response })
})

module.exports = router

//code from solution file

// const publicKeys = '_id title start_year season_count characters'

// router.get('/', async (req, res, next) => {
//   const status = 200
//   const response = await Series.find(req.query).select(publicKeys)  
//   res.json({ status, response })
// })
// router.post('/', async (req, res, next) => {
//   const status = 201
//   try {
//     const series = await Series.create(req.body)
//     const response = await Series.findById(series._id).select(publicKeys)

//     res.json({ status, response })  
//   } catch (error) {
//     error.status = 400
//     error.message = 'Invalid data. Please check your POST body and try again.'
    
//     next(error)
//   }
// })

// router.put('/:id', async (req, res, next) => {
//   const status = 200
//   const query = { _id: req.params.id }
//   const options = { new: true }
//   const response = await Series.findOneAndUpdate(query, req.body, options).select(publicKeys)
  
//   res.json({ status, response })
// })

// router.delete('/:id', async (req, res, next) => {
//   const status = 200
  
//   const query = { _id: req.params.id }
//   const response = await Series.findOneAndDelete(query, req.body).select(publicKeys)

//   res.json({ status, response })
// })