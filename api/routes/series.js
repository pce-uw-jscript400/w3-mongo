const router = require("express").Router();
const { generate: generateId } = require("shortid");
const Series = require("../models/series");


const publicKeys = "_id title start_year season_count";

router.get("/", async (req, res, next) => {
  const status = 200;
  const response = await Series.find(req.query).select(publicKeys);
  res.json({ status, response });
});

router.get("/:id", async (req, res, next) => {
  const status = 200;
  console.log(req.params.id)
  const response = await Series.find({'_id': req.params.id}).select(publicKeys)

// correct solution 
  //const response = await Series.findById(req.params.id).select(publicKeys)
  res.json({ status, response });
});

router.post("/", async (req, res, next) => {
  const status = 201;
  try {
    const series = await Series.create(req.body);
    const response = await Series.findById(series._id).select(publicKeys);

    res.json({ status, response });
  } catch (error) {
    error.status = 400;
    error.message = "Insert failed. Check that all required data is present and formatted properly.";

    next(error);
  }
});

router.put("/:id", async (req, res, next) => {
  const status = 200;
  //updateOne solution
  const keyForUpdate = Object.keys(req.body)
  // const updateOneSolution = await Series.updateOne({ _id: req.params.id }, {[keyForUpdate]: req.body[keyForUpdate] })
  // console.log(updateOneSolution);
  const findOneAndUpdateOneSolution = await Series.findOneAndUpdate(
     { _id: req.params.id },
     { [keyForUpdate]: req.body[keyForUpdate] },
     { new: true }
   )
  console.log(findOneAndUpdateOneSolution);
  const response = await Series.findById(req.params.id).select(publicKeys);;

  res.json({ status, response });
});

router.delete("/:id", async (req, res, next) => {
  const status = 200;
  const findOneAndDeleteSolution = await Series.findOneAndDelete(
    { _id: req.params.id }
  )
 console.log(findOneAndDeleteSolution);
 const response = await findOneAndDeleteSolution;


  res.json({ status, response });
});

module.exports = router;
