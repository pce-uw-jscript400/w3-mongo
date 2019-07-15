const router = require('express').Router()
const Series = require('../models/series');
const { generate: generateId } = require('shortid')

// const series = [{
//   id: "j9U3iNIQi",
//   name: "Buffy the Vampire Slayer"
// }];

router.get('/', async (req, res, next) => {
  const status = 200
  const response = await Series.find(req.query).select('_id title start_year season_count characters');
  res.json({ status, response })
})

router.post('/', async (req, res, next) => {
  const status = 201
  try {
    const response = await Series.create(req.body);
    res.json({ status, response })
  } catch (error) {
    console.log(error.name)
    if (error.name === 'ValidationError') {
      res.status(400).json({ status: 400, response: error.message })
    } else {
      res.status(500).json({ status: 500, response: error.message })
    }
  }
})

router.get('/:id', async (req, res, next) => {
  const status = 200
  const response = await Series.findById(req.params.id).select('_id title start_year season_count');
  res.json({ status, response })
})

router.get('/:id/characters', async (req, res, next) => {
  const status = 200
  const response = await Series.findById(req.params.id).select('_id characters');
  res.json({ status, response })
})

router.put('/:id', async (req, res, next) => {
  const status = 200
  let response;
  try {
    reponse = await Series.findOneAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { new: true }
    ).select('_id title start_year season_count');
    res.json({ status, response })
  }catch (error) {
    console.log(error)
    if (error.name === 'ValidationError') {
      res.status(400).json({ status: 400, response: error.message })
    } else {
      res.status(500).json({ status: 500, response: error.message })
    }
  }
});

router.delete('/:id', async (req, res, next) => {
  const status = 200
  let response;
  reponse = await Series.findOneAndDelete(
    { _id: req.params.id }
  ).select('_id title start_year season_count');

  res.json({ status, response })
})

module.exports = router