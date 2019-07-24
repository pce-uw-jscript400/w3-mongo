const router = require('express').Router()
const { generate: generateId } = require('shortid')
const Series = require('../../models/series')

const series = [{
  id: "j9U3iNIQi",
  name: "Buffy the Vampire Slayer"
}];

router.get('/', async (req, res, next) => {
  const status = 200
  // const response = await Series.find().select(`-_id -__v`)
  // const response = await Series.find().select(`title start_year`)
  // res.json({ status, response})

  Series.find().then(response => {
    res.json({ status, response})
  })
})

router.post('/', async (req, res, next) => {
  const status = 201
  try {
    const response = await Series.create(req.body)
    res.json({ status, response})
  } catch (error) {
    console.error(error)
    const e = new Error('Something went bad')
    e.status = 400
    next(e)
  }

  // const response = await Series.create({ 
  //   title: 'Stranger Things',
  //   start_year: 2016,
  //   season_count: 3
  // })

  // try {
  //   const response = await Series.create({ 
  //   title: 'Stranger Things',
  //   start_year: 2016,
  //   season_count: 3
  // })
  //   res.json({ status, response})
  // } catch (error) {
  //   console.error(error)
  //     const e = new Error('Something went bad')
  //     e.status = 400
  //     next(e)
  // }

  // Series.create(req.body).then(response => {
  //     res.json({ status, response })
  //   }).catch(error =>   {
  //     console.error(error)
  //     const e = new Error('Something went bad')
  //     e.status = 400
  //     next(e)
  //   })
})

router.get('/:id', async (req, res, next) => {
  const status = 200

  // const response = await Series.find(({ id }) => id === req.params.id)

  const response = await Series.findById(req.params.id)

  res.json({ status, response })
})

router.put('/:id', async (req, res, next) => {
  const status = 200

  // const response = await Series.updateOne({ 
  //   _id: req.params.id
  //   }, {
  //     title: 'It has changed'
  //   })

  //   res.json({ status, response })

  const response = await Series.findOneAndUpdate({
    _id: req.params.id
  }, {
    title: req.body.title
  }, {new: true},
  res.json({ status, response })
  )

  // const response = { id: req.params.id, ...req.body }
  // const single = series.find(({ id }) => id === req.params.id)
  // const index = series.indexOf(single)

  // series.splice(index, 1, response)
  
})

router.delete('/:id', async (req, res, next) => {
  const status = 200
  const response = await Series.findOneAndDelete({ _id: req.params.id })

  res.json({ status, response })
})

module.exports = router