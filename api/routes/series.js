const router = require('express').Router()
const { generate: generateId } = require('shortid')
const Series = require('../models/series');

const series = [{
  id: "j9U3iNIQi",
  name: "Buffy the Vampire Slayer"
}];

router.get('/', async (req, res, next) => {
  const status = 200
  const response = await Series.find().select('title start_year season_count character');
  
  if ('start_year' in req.query) {
    const filteredResponse = [];

    response.forEach((item) => {
      if(item['start_year'] === 1997) {
        filteredResponse.push(item);
      }
    })

    res.json({ status, filteredResponse })
  } else {
    res.json({ status, response })
  } 
});

router.post('/', async(req, res, next) => {
  try {
    const status = 201;
    const response = await Series.create(req.body);
    res.json({ status, response })
  } catch (error) {
    console.log(error.message);
    const e = new Error("something is wrong");
    e.status = 400;
    next(e);
  }
  
});


router.get('/:id', async (req, res, next) => {
  const status = 200
  const response = await Series.findById(req.params.id).select('title start_year season_count character');
 
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


router.get('/:seriesId/characters/:id', async (req, res, next) => {
  const status = 200;
  const series = await Series.characters.findById(req.params.id);
  // const characters = series.characters;

  
  console.log('series', series);
  

  res.json({ status, series});

})

router.put('/:id/characters', async (req, res, next) => {
  const status = 201;
  const response = await Series
});

module.exports = router