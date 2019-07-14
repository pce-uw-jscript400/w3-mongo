const router = require('express').Router()
const { generate: generateId } = require('shortid')
const Series = require('../models/series')

const series = [{
  id: "j9U3iNIQi",
  name: "Buffy the Vampire Slayer"
}];

router.get('/', async (req, res, next) => {
  const status = 200
  let filter = req.query.start_year
  const response = await Series.find({start_year: filter}).select('title start_year season_count')
  res.json({ status, response })
})

router.post('/', async (req, res, next) => {
  const status = 201
  try{
    const response = await Series.create(req.body)
    res.json({status, response})
  }catch(error){
    console.error(error)
    const e = new Error('something went bad')
    e.status = 400
    next(e)
  }


  //Series.create(req.body).then(response => {
    //res.json({ status, response })
   //}).catch(error => {
    // console.log(error)
     //const e = new Error('something went bad')
    // e.status = 400
     //next(e)
   //});
})

router.post('/:id/characters', async (req, res, next) =>{
  const status = 200
  const parent= await Series.findOne({_id: req.params.id})
  const newChild= parent.characters.push(req.body)
  newChild.isNew;
  parent.save();
  const response =  parent.characters
  res.json({ status, response })
})

router.get('/:id', async (req, res, next) => {
  const status = 200
  const id = req.params.id;
  const response =  await Series.findOne({_id: id})
  res.json({ status, response })
})

router.get('/:id/characters', async (req, res, next) =>{
  const status = 200
  const parent= await Series.findOne({_id: req.params.id})
  const response =  parent.characters
  res.json({ status, response })
})

router.put('/:id', async(req, res, next) => {
  const status = 200
  const response = await Series.findOneAndUpdate({
    _id: req.params.id}, {title: req.body.title}, {new: true})
  res.json({ status, response })
})

router.get('/:id/characters/:subid', async(req, res, next) => {
  const status = 200
  const id = req.params.id
  const subid = req.params.subid
  const parent= await Series.findOne({_id: id})
  response = parent.characters.id(subid)
  res.json({ status, response })
})

router.put('/:id/characters/:subid', async(req, res, next) => {
  const status = 200
  const id = req.params.id
  const subid = req.params.subid
  const parent= await Series.findOne({_id: id})
  const character = parent.characters.id(subid)
  character.set(req.body)
  parent.save()
  response = character
  res.json({ status, response })
})

router.delete('/:id', async (req, res, next) => {
  const status = 200
  const response = await Series.findOneAndDelete({ _id: req.params.id })
  res.json({ status, response })
})

router.delete('/:id/characters/:subid', async(req, res, next) => {
  const status = 200
  const id = req.params.id
  const subid = req.params.subid
  const parent= await Series.findOne({_id: id})
  const child = parent.characters.id(subid)
  child.remove()
  parent.save()
  response = parent.characters
  res.json({ status, response })
})


module.exports = router