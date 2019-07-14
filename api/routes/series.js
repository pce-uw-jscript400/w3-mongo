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

router.get('/', async (req, res, next) => {
  const status = 200
  // const response = await Series.find().select('title') //include things
  const response = await Series.find().select('-_id -__v') //exclude things
  res.json({ status, response })
})

// router.get('/', async (req, res, next) => {
//   const status = 200
//   Series.find().then(response => {
//     res.json({ status, response })
//   })
// })

// router.get('/', async (req, res, next) => {
//   const status = 200
//   const response = await Series.find(req.query).select(publicKeys)  
//   res.json({ status, response })
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

  // Series.create(req.body).then(response => {
  //   res.json({ status, response })
  // }).catch(error =>{
  //   console.error(error)
  //   const e = new Error('Something went bad')
  //   e.status = 400
  //   next(e)
  // })
  
})

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

router.put('/:id', async (req, res, next) => {
  const status = 200
  const response = await Series.findOneAndUpdate({ 
    _id: req.params.id 
  }, { 
    title: req.body.title
  }, { new: true })

  // const response = { id: req.params.id, ...req.body }
  // const single = await Series.find(({ id }) => id === req.params.id)
  // const index = await Series.indexOf(single)

  // series.splice(index, 1, response)
  
  res.json({ status, response })
})

// router.put('/:id', async (req, res, next) => {
//   const status = 200
//   const query = { _id: req.params.id }
//   const options = { new: true }
//   const response = await Series.findOneAndUpdate(query, req.body, options).select(publicKeys)
  
//   res.json({ status, response })
// })

router.delete('/:id', async (req, res, next) => {
  const status = 200
  const response = await Series.findOneAndDelete({ _id: req.params.id })
 
  // const response = series.find(({ id }) => id === req.params.id)
  // const index = series.indexOf(response)

  // series.splice(index, 1)

  res.json({ status, response })
})

// router.delete('/:id', async (req, res, next) => {
//   const status = 200
  
//   const query = { _id: req.params.id }
//   const response = await Series.findOneAndDelete(query, req.body).select(publicKeys)

//   res.json({ status, response })
// })

module.exports = router