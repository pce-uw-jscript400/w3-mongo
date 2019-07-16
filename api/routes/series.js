const router = require('express').Router()
const Series = require('../models/series')

const publicKeys = '_id title start_year season_count characters'

router.get('/', async (req, res, next) => {
  const status = 200
  const response = await Series.find(req.query).select(publicKeys)  
  
  //Series.find().then(response => {
  //   res.json({status, response})
  // })

  res.json({ status, response })
})

router.post('/', async (req, res, next) => {
  const status = 201
  
  try {
    const response = await Series.create(req.body).select(publicKeys)  
    res.json({ status, response })
  } catch(error) {
    console.error(error)
    const e = new Error('Something went bad')
    e.status = 400
    next(e)
  }
 

  // Series.create({
  //   title: "Stranger Things",
  //   start_year: 2016,
  //   season_count: 3
  // }).then( response => {
  //   res.json({status,response})
  // }).catch( error =>{
  //   console.error(error)
  //   const e = new Error('Something went bad')
  //   e.status = 400
  //   next(e)
  // })

  
  
})

router.get('/:id', async (req, res, next) => {
  const status = 200
  const{ id } = req.params
  //const response = series.find(({ id }) => id === req.params.id)

  //const response = await Series.findOne({ _id: req.params.id})
  //const response = await Series.find({ _id: req.params.id})[0]
  const response = await Series.findById(id).select(publicKeys)  

  res.json({ status, response })
})

router.put('/:id', async (req, res, next) => {
  const status = 200

  const response = await Series.findOneAndUpdate({ _id: req.params.id }, {title: req.body.title}, {new: true}).select(publicKeys)  

  // const response = { id: req.params.id, ...req.body }
  // const single = series.find(({ id }) => id === req.params.id)
  // const index = series.indexOf(single)

  // series.splice(index, 1, response)
  
  res.json({ status, response })
})

router.delete('/:id', async (req, res, next) => {
  const status = 200
  const response = await Series.findOneAndDelete({_id: req.params.id}).select(publicKeys)  
  // const response = series.find(({ id }) => id === req.params.id)
  // const index = series.indexOf(response)

  // series.splice(index, 1)

  res.json({ status, response })
})

module.exports = router