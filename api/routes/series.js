const router = require('express').Router()
const { generate: generateId } = require('shortid')
const Series = require('../models/series')


const series = [{
  id: "j9U3iNIQi",
  name: "Buffy the Vampire Slayer"
}];

router.get('/', async (req, res, next) => {
  const status = 200
  const response = await Series.find()
  
  res.json({ status, response })
})

router.post('/', async (req, res, next) => {
  const status = 201
  try{
    const response = await Series.create(req.body);
    res.json(response)
  }
  catch(error) {
    console.error(error)
    const e = new Error('Somathing went wrong')
    e.status = 400;
    next(e)
  }
 
  
  res.json({ status, response })
})

router.get('/:id', async (req, res, next) => {
  const status = 200
  const response = await Series.findById(req.params.id)

  res.json({ status, response })
})

router.put('/:id', async (req, res, next) => {
  const status = 200
  const response = await Series.updateOne({
    _id : req.params.id
  },
  {
    title : req.body.title
  },
  {
    new : true
  })
  
  res.json({ status, response })
})

router.delete('/:id', async (req, res, next) => {
  const status = 200
  const response = await Series.findOneAndDelete({
    _id : req.params.id
  })

  res.json({ status, response })
})

module.exports = router