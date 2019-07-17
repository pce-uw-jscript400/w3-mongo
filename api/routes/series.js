const router = require('express').Router()
const { generate: generateId } = require('shortid')
const Series = require('../models/series')

// const publicKeys = '_id title start_year season_count characters'

const series = [{
  id: "j9U3iNIQi",
  name: "Buffy the Vampire Slayer"
}];


router.get('/', async (req, res, next) => {

  const status = 200
  Series.find().then(response => {
    res.json({ status, response })
  })
 
  // Series.find().select('-title').then(response => {
  //   res.json({ status, response })
  // })
  // const response = await Series.find()
  // res.json({ status, response })
})

router.post('/', async (req, res, next) => {
  const status = 201
  try{
    const response = await Series.create(req.body)
    res.json({ status, response })
  } catch (error) {
      console.log(error)
      const e = new Error('Huston... we have a problem!')
      e.status = 400
      next(e)
  }
  // try catch worked!
  
  // Series.create(req.body).then(response => {
  //   res.json({ status, response})
  // }).catch(error => {
  //   console.log(error)
  //   const e = new Error('Huston... we have a problem!')
  //   e.status = 400
  //   next(e)
  // })
  
  // the .catch didn't work like in the recording.  Just failed the validation due to not having the required title, etc. 
  // res.json({ status, response })
})

router.get('/:id', async (req, res, next) => {
  const status = 200
  // const response = Series.find(({ id }) => id === req.params.id)
  // const response = Series.findOne({ _id: req.params.id})

  const response = await Series.findById(req.params.id)
  res.json({ status, response })

  //promise function
  // Series.findById(req.params.id).then(response => {
  //   res.json({ status, response })
  // })
})


router.put('/:id', async (req, res, next) => {
  const status = 200
  //First Example
  // const response = await Series.updateOne({ 
  //   _id: req.params.id
  //  }, { 
  //    title: 'It has Changed'
  //   })

  // This always created a null entry. If I remove req.body.title with a string.  It works.
  const response = await Series.findOneAndUpdate({ 
    _id: req.params.id
   }, { 
      title: req.body.title
    }, { new: true })
  
  res.json({ status, response })
})

router.get('/:id/characters', async (req, res, next) =>{
  const status = 200
  const response = await Series.findById(req.params.id)
  res.json({ status, response })
})

router.delete('/:id', async (req, res, next) => {
  const status = 200
  Series.findOneAndDelete({ 
    _id: req.params.id 
  }).then(response => {
    res.json({ status, response })
  })
  
})

module.exports = router