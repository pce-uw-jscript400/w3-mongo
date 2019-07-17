const router = require('express').Router()
const { generate: generateId } = require('shortid')
const Series = require('../models/series')

const series = [{
  id: "j9U3iNIQi",
  name: "Buffy the Vampire Slayer"
}];

router.get('/', async (req, res, next) => {
  const status = 200
  // const response = await Series.find()
  // res.json({ status, response })

  Series.find().then(response => {
    res.json({ status, response })
  })
})

router.post('/', async (req, res, next) => {
  const status = 201
  const response = await Series.create(req.body)
  res.json({ status, response })

  // Series.create(req.body).then(response => {
  //   res.json({ status, response })
  // })
})

router.get('/:id', async (req, res, next) => {
  const status = 200
  // const response = await Series.findOne({ _id:req.params.id})
  // const response = await Series.find({ _id:req.params.id})
  // const response = await Series.findById(req.params.id)
  
  // res.json({ status, response })
  
  Series.findById(req.params.id).then(response => {
    res.json({ status, response })
  })
})

router.put('/:id', async (req, res, next) => {
  const status = 200
  const response = await Series.findOneAndUpdate({ 
    _id: req.params.id 
  }, { 
    title: req.body.title 
  }, {
    new: true
  })
  
  res.json({ status, response })
})

router.delete('/:id', async (req, res, next) => {
  const status = 200
  const response = await Series.findOneAndDelete({ _id: req.params.id })

  res.json({ status, response })
})

module.exports = router