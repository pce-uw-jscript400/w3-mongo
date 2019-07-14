const router = require('express').Router()
const { generate: generateId } = require('shortid')
const Series = require('../models/series')


const series = [{
  id: "j9U3iNIQi",
  name: "Buffy the Vampire Slayer"
}];

router.get('/',async (req, res, next) => {
  const status = 200
  const response = await Series.find()//.select('title')
  res.json({ status, response })

  //***/promise based***
  //Series.find().then(response=>{
  //  res.json({status,response})
  //})
})

router.post('/',async  (req, res, next) => {
  const status = 201
  try{
    const response = await Series.create(req.body)
    res.json({ status, response })
  }catch(error){
    console.log(error)
      const e = new Error(error.message)
      e.status = 400
      next(e)
  }
  

  //***Promise based***/
  //Series.create(req.body)
  //  .then(response=>{
  //    res.json({status, response})
  //  }).catch(error=>{
  //      console.log(error)
  //      const e = new Error('Something did not work')
  //      e.status = 400
  //      next(e)
  //  })
  })
      
  

router.get('/:id',async (req, res, next) => {
  const status = 200
  const response = await Series.findById(req.params.id)

  //**Another option **/
  //const response = await Series.findOne({_id: req.params.id})
  res.json({ status, response })

  /*Promise based*/
  //Series.findById(req.params.id).then(response =>{
  //  res.json({status,response})
  //})
})

router.put('/:id',async (req, res, next) => {
  const status = 200
  const response = await Series.findOneAndUpdate({_id: req.params.id},{title: req.body.title},{new: true})
  
  res.json({ status, response })
})

router.delete('/:id',async (req, res, next) => {
  const status = 200
  const response = await Series.findOneAndDelete({_id: req.params.id})

  res.json({ status, response })
})

module.exports = router