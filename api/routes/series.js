const router = require('express').Router()
const { generate: generateId } = require('shortid')
const Series = require('../models/series')

const series = [{
  id: "j9U3iNIQi",
  name: "Buffy"
}]
/*
router.get('/', async (req, res, next) => {
  const status = 200
  const response = await Series.find().select('title start_year season_count');
  res.json({ status, response })
})*/

router.get('/', async (req, res, next) => {
  const status = 200
  console.log(req.query);
  const response = await Series.find().select('title start_year season_count characters');
  res.json({ status, response })
})

router.get('/:id', async (req, res, next) => {
  const status = 200
  const response = await Series.findById(req.params.id).select('title start_year season_count characters')
  res.json({ status, response })
  next() //necessary to distinguish between this route and the one below
})

router.get('/:id/characters', async (req, res, next) => {
  const status = 200
  const response = await Series.findById(req.params.id).select('characters')
  res.json({ status, response })
})

router.post('/', async (req, res, next) => {
  const status = 201
  try {
    const response = await Series.create(req.body)
    res.json({ status, response })
  }
  catch(error) {
    console.error(error)
    const e = new Error("One or more fields is missing.")
    e.status = 400
    next(e)
  }
})

router.put('/:id', async (req, res, next) => {
  const status = 200
  const response = await Series.findOneAndUpdate({ _id:req.params.id }, 
    { title: req.body.title, start_year:req.body.start_year, season_count:req.body.season_count, characters:req.body.characters }, 
    { new:true, omitUndefined:true }).select('title start_year season_count characters')
  res.json({ status, response })
})

router.delete('/:id', async (req, res, next) => {
  const status = 200
  const response = await Series.findOneAndDelete({_id:req.params.id}).select('title start_year season_count characters')
  res.json({ status, response })
})

module.exports = router
