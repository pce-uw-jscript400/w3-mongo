const router = require('express').Router()
const { generate: generateId } = require('shortid')

const Series = require('../models/series')

// TEST BODY
// {  "title": "Veronica Mars",
// 	"start_year": 2002,
// 	"season_count": 4,
// 	"characters": [
// 	{
// 		"name": "Veronica",
// 		"actor": "Kristen Bell"
// 	}]
//
// }

const series = [{
  id: "j9U3iNIQi",
  name: "Buffy the Vampire Slayer"
}];

router.get('/', async (req, res, next) => {
  const status = 200
  const response = await Series.find({...req.query})
    .select('id title start_year season_count characters')

  res.json({ status, response })

  // Series.find().then(response => {
  //   res.json({ status, response })
  // })
})

router.post('/', async (req, res, next) => {
  const status = 201
  try {
    let response = await Series.create(req.body)
    // response = response['title']
    res.json({ status, response })
  } catch (error) {
    console.log(error)
    const e = new Error(error)
    e.status = 400
    next(e)
  }


  // Series.create({
  //   title: 'Veronica Mars',
  //   start_year: 2002,
  //   season_count: 4
  // }).then(response => {
  //   res.json({ status, response })
  // }).catch(error +> {
  //   const e = new Error('noooooooo')
  //   e.status = 400
  //   next(e)
  // })

})

router.get('/:id', async (req, res, next) => {
  const status = 200

  // const response = await Series.findOne({ _id: req.params.id })
  // const response = await Series.find({ _id: req.params.id })
  const response = await Series.findById(req.params.id)
    .select('id title start_year season_count characters')

  // Series.findById(req.params.id).then(response => {
  //   res.json({ status, response })
  // })
  res.json({ status, response })
})

router.put('/:id', async (req, res, next) => {
  const status = 200

  const response = await Series.findOneAndUpdate(
    { _id: req.params.id },
    { title: req.body.title },
    { start_year: req.body.start_year },
    { season_count: req.body.season_count },
    { characters: req.body.characters },
    { new: true })

  res.json({ status, response })
})

router.delete('/:id', async (req, res, next) => {
  const status = 200
  // const response = series.find(({ id }) => id === req.params.id)
  // const index = series.indexOf(response)
  //
  // series.splice(index, 1)

  const response = await Series.findOneAndDelete({ _id: req.params.id})
    .select('id title start_year season_count characters')

  res.json({ status, response })
})


module.exports = router
