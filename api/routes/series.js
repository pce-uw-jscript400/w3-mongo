const router = require('express').Router()
const { generate: generateId } = require('shortid')
const Series = require('../models/series.js')


const series = [{
  id: "j9U3iNIQi",
  name: "Buffy the Vampire Slayer"
}];

router.get('/', async (req, res, next) => {
  const status = 200
  // const response = await Series.find()
  // res.json({ status, response })
  // or
  Series.find().then(response => {
    res.json({status, response})
  }).catch(error(error))
  const e = new Error('Something went bad')
  e.status = 400
  next(e)
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

// router.post('/', async (req, res, next) => {
//   const status = 201
//   try {
//     const series = await Series.create(req.body)
//   const response = await Series.create(req.body) 
//     res.json({ status, response})
//     // title: 'Stranger Things',
//     // start_year: 2016,
//     // season_count: 3
// }) catch (error) {
//     console.error(error)
//     const e = new Error('Something went bad')
//     e.status = 400
//     next(e)
//   }
//   // series.push({ id: generateId(), ...req.body })
//   // const response = series
//   // const response = await Series.create({ 
//   //   title: 'Stranger Things',
//   //   start_year: 2016,
//   //   season_count: 3

//   Series.create(req.body.then(response => {
//     res.json({ status, response})
//   }).catch(error => {
//     console.error(error)
//     const e = new Error('Something went bad')
//     e.status = 400
//     next(e)
//   }))
// })
  
  // res.json({ status, response })
// })


router.get('/:id', async (req, res, next) => {
  const status = 200
  // const response = series.find(({ id }) => id === req.params.id)
  const response = await Series.findById(req.params.id)
  res.json({ status, response })
})

router.put('/:id', async (req, res, next) => {
  const status = 200
  // const response = await Series.updateOne(
  const response = await Series.findOneAndUpdate(
    { 
      _id: req.params.id
    }, {
     title: req.body.title
    }, { new: true })
  // const response = { id: req.params.id, ...req.body }
  // const single = series.find(({ id }) => id === req.params.id)
  // const index = series.indexOf(single)

  // series.splice(index, 1, response)
  
  res.json({ status, response })

// from method docs:
  // const res = await Series.updateOne({ name: 'Jean-Luc Picard' }, { ship: 'USS Enterprise' });
  // res.n; // Number of documents matched
  // res.nModified; // Number of documents modified
})

router.delete('/:id', async (req, res, next) => {
  const status = 200
  const response = await series.findOneAndDelete({_id: req.params.id})
  // const index = series.indexOf(response)

  // series.splice(index, 1)

  res.json({ status, response })
})

module.exports = router