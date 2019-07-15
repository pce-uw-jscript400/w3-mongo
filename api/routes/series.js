const router = require('express').Router()
const { generate: generateId } = require('shortid')
const Series = require('../models/series')

const series = [{
  id: "j9U3iNIQi",
  name: "Buffy the Vampire Slayer"
}, {
  id: "some nonsense",
  name: "Stranger Things"
}];

router.get('/', async (req, res, next) => {

  const status = 200
  const response = await Series.find().select('-_id')
  
  res.json({ status, response })
})

router.post('/', async (req, res, next) => {
  const status = 201
  // const response = await Series.create({ 
  //   title: req.params.id, 
  //   start_year: req.params.start_year,
  //   season_count: req.params.season_count
  // })

  Series.create(req.body).then(response => {
    res.json({ status, response})
  }).catch(error => {
    console.error(error)
    const e = new Error('Something went bad')
    e.status = 400
    next(e)
  })
  
  res.json({ status, response })
})

router.get('/:id', async (req, res, next) => {
  const status = 200
  const response = await Series.findById(req.params.id)
  
  res.json({ status, response })
})

router.get('/:id/characters', async (req, res, next) =>{
  const status = 200
  const parentResponse = await Series.findOne({ _id: req.params.id })

  const response =  parentResponse.characters

  res.json({ status, response })
})

router.put('/:id', async (req, res, next) => {
  const status = 200
  const response = await Series.updateOneAndUpdate({ 
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
  const response = await Series.findOneAndDelete({
    _id: req.params.id
  })

  res.json({ status, response })
})

router.delete('/:id/characters/:subid', async(req, res, next) => {
  const status = 200
  const subid = req.params.subid
  const parentResponse= await Series.findOne({_id: req.params.id})

  const child = parentResponse.characters.id(subid)
  child.remove()

  parentResponse.save()

  response = parentResponse.characters

  res.json({ status, response })
})

module.exports = router