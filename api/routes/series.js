const router = require('express').Router()
const Series = require('../models/series');
const { generate: generateId } = require('shortid')

const series = [{
  id: "j9U3iNIQi",
  name: "Buffy the Vampire Slayer"
}];

router.get('/', async(req, res, next) => {
  const status = 200
  const response = await Series.find();
  
  res.json({ status, response })
})

router.post('/', async(req, res, next) => {
  const status = 201
    //series.push({ id: generateId(), ...req.body })
  // try{
    const response = await Series.create(req.body);
    res.json({ status, response })
  // }catch(error){
  //   console.log(error);
  // }
  
  
})

router.get('/:id', async(req, res, next) => {
  const status = 200
  const response = await Series.findById(req.params.id);
  res.json({ status, response })
})

router.put('/:id', async(req, res, next) => {
  const status = 200
  const reponse = await Series.findOneAndUpdate(
    { _id: req.params.id },
    { $set: req.body },
    { new: true }
  );
  
  res.json({ status, response })
})

router.delete('/:id', async(req, res, next) => {
  const status = 200
  const reponse = await Series.findOneAndDelete(
    { _id: req.params.id }
  );

  res.json({ status, response })
})

module.exports = router