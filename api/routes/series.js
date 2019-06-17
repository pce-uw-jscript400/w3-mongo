const router = require('express').Router()
const { generate: generateId } = require('shortid')

const series = [{
  id: "j9U3iNIQi",
  name: "Buffy the Vampire Slayer"
}];

router.get('/', (req, res, next) => {
  const status = 200
  const response = series
  
  res.json({ status, response })
})

router.post('/', (req, res, next) => {
  const status = 201
  
  series.push({ id: generateId(), ...req.body })
  const response = series
  
  res.json({ status, response })
})

router.get('/:id', (req, res, next) => {
  const status = 200
  const response = series.find(({ id }) => id === req.params.id)

  res.json({ status, response })
})

router.put('/:id', (req, res, next) => {
  const status = 200
  const response = { id: req.params.id, ...req.body }
  const single = series.find(({ id }) => id === req.params.id)
  const index = series.indexOf(single)

  series.splice(index, 1, response)
  
  res.json({ status, response })
})

router.delete('/:id', (req, res, next) => {
  const status = 200
  const response = series.find(({ id }) => id === req.params.id)
  const index = series.indexOf(response)

  series.splice(index, 1)

  res.json({ status, response })
})

module.exports = router