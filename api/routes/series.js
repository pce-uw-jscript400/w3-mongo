const router = require('express').Router()
const { generate: generateId } = require('shortid')
const mongoose = require('mongoose')
const Series = require('../models/series')
const helper = require('../helper/helper')

const series = [{
  id: "j9U3iNIQi",
  name: "Buffy the Vampire Slayer"
}];

//GET - Route
router.get('/', async (req, res, next) => {
  const status = 200
  // const response = series

 //  try {
 //    const status = 200
 //    const response = await Series.find()
 // //.select('title start_year season_count')
 //    res.status(status).json({ status, response })
 //  } catch (error) {
 //    error.status = 500
 //    error.message = `${req.method} ${req.path} failed. Internal server error.`
 //    next(error)
 //  }
//.select('title start_year  season_count -_id')
//.select('title start_year  season_count -_id')
  Series.find({...req.query}).select('title start_year season_count characters') //Promise
  .then((response) => {
    const status = 200
    res.status(status).json({ status, response })
  })
  .catch((error) => {
       error.status = 500
       error.message = `${req.method} ${req.path} failed. Internal server error.`
       next(error)
  })

  // res.json({ status, response })
})




// POST - Route
router.post('/', helper.validate, async (req, res, next) => {
  const status = 201

  // series.push({ id: generateId(), ...req.body })
  //
  // const response = series
  //
  // res.json({ status, response })
 // console.log(req.body)

  // try {
  //   const { title, start_year, season_count }  = req.body
  //
  //   console.log(req.body)
  //   // const serie = new Series()
  //   const response = await Series.create({ _id: mongoose.Types.ObjectId(), title, start_year, season_count })
  //   const status = 201
  //
  //   res.status(status).json({ status, response })
  //
  // } catch (error) {
  //   error.status = 500
  //   error.message = `${req.method} ${req.path} failed. Internal server error.`
  //   next(error)
  // }

  // const { title, start_year, season_count }  = req.body

  //Promise
  Series.create(req.body)
  .then(response => {
    res.json(response)
  })
  .catch(error => {
    console.error(error)
    const e = new Error('Somethings went bad')
    e.status = 400
    next(e)
    // res.json(error)
  })



})

//GET - Specific Document ID Route
router.get('/:id', (req, res, next) => {
  const status = 200
  // const { id } = req.params
  // const response = series.find(({ id }) => id === req.params.id)


  // Series.findById(req.params.id)
  Series.findOne({ _id: req.params.id })
  .then(response => {
    res.json(response)
  })
  .catch((error) => {
    res.json(error)
  })


  // res.json({ status, response })
})


//PUT - Route
router.put('/:id', (req, res, next) => {
  const status = 200
  const response = { id: req.params.id, ...req.body }
  // const single = series.find(({ id }) => id === req.params.id)
  // const index = series.indexOf(single)

  //Promise
  Series.findOneAndUpdate({ _id: req.params.id}, {...req.body}, {new:true})
  // Series.updateOne({ _id: req.params.id}, {title: req.body.title})
  .then((response) => {
    res.json(response)
  })
  .catch((error) => {
    res.json(error)
  })

  // series.splice(index, 1, response)

  // res.json({ status, response })
})


//DELETE - Route
router.delete('/:id', (req, res, next) => {
  const status = 200
  // const response = series.find(({ id }) => id === req.params.id)
  // const index = series.indexOf(response)

  // series.splice(index, 1)

  // res.json({ status, response })

  //Promise
  Series.findOneAndDelete({_id: req.params.id})
  .then(response => {
    res.json(response)
  })
  .catch(error => {
    res.json(error)
  })

})



//GET - Specific Series Character Routes
router.get('/:seriesID/characters', (req, res, next) => {
  const status = 200
  // const { id } = req.params
  // const response = series.find(({ id }) => id === req.params.id)

  // Series.findById(req.params.id)
  Series.find({_id : req.params.seriesID}).select('characters._id characters.name characters.actor -_id')//Promise
  .then(response => {
    res.json(response)
  })
  .catch((error) => {
    res.json(error)
  })

  // res.json({ status, response })
})

module.exports = router
