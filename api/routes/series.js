const router = require('express').Router()
const { generate: generateId } = require('shortid')
const Series = require('../models/series')

const series = [{
  id: "j9U3iNIQi",
  name: "Buffy the Vampire Slayer"
}];

router.get('/', async (req, res, next) => {
  //console.log(Series.find())
  const query = req.query
  const status = 200
  // const response = await Series.find().select('-_id -__v')
  const response = await Series.find({...query})
  .select('id title start_year season_count characters')


  res.json({ status, response })
  // or alternatively
  // Series.find().then(response => {
    //res.json({status, response})
  // })

})

router.post('/', async (req, res, next) => {
  const status = 201
  try {
    const response = await Series.create(
      req.body
    )
  
   res.json({ status, response })
  }catch(error ) {
      console.error(error)
      const e = new Error('Bad request')
      e.status = 400
      next (e)
    }
      // Series.create({
      //   title: 'Stranger things',
      //   start_year: 2016,
      //   season_count: 3
      // }).then(response => {
      //   res.json({status, response})
      // })
    
})

router.get('/:id', async (req, res, next) => {
  const status = 200
  // const response = await Series.findOne({ _id: req.params.id})
  // const reponse = await Series.find({_id: req.params.id})
  const response = await Series.findById(req.params.id)

  res.json({ status, response })
})

router.put('/:id', async (req, res, next) => {
  const status = 200
  const response = await Series.updateOne(
    {_id:req.params.id}, 
    {title:'It has changed'}
  )

  // const response = await Series.findOneAndUpdate (
  //   {_id:req.params.id},
  //   {title: req.body.title},
  //   {new: true}
  // )

  ////{ id: req.params.id, ...req.body }
  ////const single = series.find(({ id }) => id === req.params.id)
  ////const index = series.indexOf(single)
  ////series.splice(index, 1, response)
  
  res.json({ status, response })
})

router.delete('/:id', async (req, res, next) => {
  const status = 200
  const response = await Series.findOneAndDelete({_id: req.params.id})
  //series.find(({ id }) => id === req.params.id)
  //const index = series.indexOf(response)

  //series.splice(index, 1)

  res.json({ status, response })
})


router.get('/:id/characters', async (req, res, next) => {
  const status = 200
  // const response = await Series.find({...query})
  // .select('id title start_year season_count characters')
  // res.json({ status, response })
  const response = await Series.findById(req.params.id)
  const characters = response.characters
  res.json({ status, characters })
})

module.exports = router