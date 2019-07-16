const router = require('express').Router()
const { generate: generateId } = require('shortid')
const Series = require('../models/series')

router.get('/', async (req, res, next) => {
  const status = 200
  const response = await Series.find(req.query).select('_id title start_year season_count characters')
  
  res.json({ status, response })
})

router.post('/', async (req, res, next) => {
  const status = 201
  
  try {
    const { _id, title, start_year, season_count, characters } = await Series.create( req.body )
    const response = { _id, title, start_year, season_count, characters}

    res.status(status).json({ status, response })
  } catch (err) {
    const errorMessages = []
    for(e in err.errors) {
      errorMessages.push(err.errors[e].message)
    }
    next({ status: 400, message: errorMessages })
  }

})

router.get('/:id', async (req, res, next) => {
  const status = 200
  const response = await Series.findById(req.params.id).select('_id title start_year season_count characters')

  res.json({ status, response })
})

router.put('/:id', async (req, res, next) => {
  const status = 200
  // const response = await Series.updateOne({ _id: req.params.id }, req.body)
  const response = await Series.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true }).select('_id title start_year season_count characters')
  
  res.json({ status, response })
})

router.delete('/:id', async (req, res, next) => {
  const status = 200
  const response = await Series.findOneAndDelete({ _id: req.params.id }).select('_id title start_year season_count characters')

  res.json({ status, response })
})

// Characters endpoints

router.get('/:seriesId/characters', async (req, res, next) => {
  const status = 200
  const series = await Series.findById(req.params.seriesId)
  const response = series ? series.characters : []
  res.json({ status, response })
})

router.get('/:seriesId/characters/:charId', async (req, res, next) => {
  const status = 200
  const series = await Series.findById(req.params.seriesId)
  const response = series ? series.characters.id(req.params.charId) : null
  res.json({ status, response })
})

router.post('/:seriesId/characters', async (req, res, next) => {
  const status = 201
  
  try {
    const series = await Series.findById(req.params.seriesId)
    series.characters.push(req.body)
    const { _id, title, start_year, season_count, characters} = await series.save()
    const response = { _id, title, start_year, season_count, characters}

    res.status(status).json({ status, response })
  } catch (err) {
    const errorMessages = []
    for(e in err.errors) {
      errorMessages.push(err.errors[e].message)
    }
    next({ status: 400, message: errorMessages })
  }
})

router.delete('/:seriesId/characters/:charId', async (req, res, next) => {
  const status = 200

  const series = await Series.findById(req.params.seriesId)
  series.characters.id(req.params.charId).remove()
  const { _id, title, start_year, season_count, characters} = await series.save()
  const response = { _id, title, start_year, season_count, characters}

  res.status(status).json({ status, response })
})

router.put('/:seriesId/characters/:charId', async (req, res, next) => {
  const status = 200
  
  try {
    const series = await Series.findById(req.params.seriesId)
    const char = series.characters.id(req.params.charId)
    Object.assign(char, req.body)
    const { _id, title, start_year, season_count, characters} = await series.save()
    const response = { _id, title, start_year, season_count, characters}

    res.status(status).json({ status, response })
  } catch (err) {
    const errorMessages = []
    for(e in err.errors) {
      errorMessages.push(err.errors[e].message)
    }
    next({ status: 400, message: errorMessages })
  }
})

module.exports = router