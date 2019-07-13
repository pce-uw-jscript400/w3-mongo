const router = require('express').Router()
const { generate: generateId } = require('shortid')
const Series = require('../models/series');

const series = [{
  id: "j9U3iNIQi",
  name: "Buffy the Vampire Slayer"
}];

router.get('/', async (req, res, next) => {
  const status = 200
  const response = await Series.find();
  res.json({ status, response })
});

router.post('/', async(req, res, next) => {
  try {
    const status = 201
    const response = await Series.create(req.body)
    res.json({ status, response })
  } catch (error) {
    console.log(error);
    const e = new Error("something is wrong");
    e.status = 400;
    next(e);
  }
  
});


router.get('/:id', async (req, res, next) => {
  const status = 200
  const response = await Series.findById(req.params.id);
 
  // const response = series.findById(({ id }) => id === req.params.id)

  res.json({ status, response })
})

// router.put('/:id', async (req, res, next) => {
//   const status = 200
//   const response = await Series.updateOne({_id: req.params.id}, { title: 'New title'});
//   // const response = { id: req.params.id, ...req.body }
//   // const single = series.find(({ id }) => id === req.params.id)
//   // const index = series.indexOf(single)

//   series.splice(index, 1, response)
  
//   res.json({ status, response })
// })

router.put('/:id', async (req, res, next) => {
  const status = 200;  
  // const response = await Series.updateOne(
  //   {
  //     _id: req.params.id,
  //   }, 
  //   {
  //     title: req.body.title,
  //   }
  // );
  const response = await Series.findOneAndUpdate({
    _id: req.params.id  }, 
    {
      title: req.body.title  
    }, );

    res.json({ status, response })
  });

router.delete('/:id', async (req, res, next) => {
  const status = 200
  const response = await Series.findOneAndDelete({_id: req.params.id});
  // const index = series.indexOf(response)

  // series.splice(index, 1)

  res.json({ status, response })
})

module.exports = router