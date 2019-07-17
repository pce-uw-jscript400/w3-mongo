const router = require("express").Router();
const { generate: generateId } = require("shortid");
const Series = require("../models/series");
// var Parent = mongoose.model("schema");

const series = [
  {
    id: "j9U3iNIQi",
    name: "Buffy the Vampire Slayer"
  }
];

router.get("/", async (req, res, next) => {
  const status = 200;
  const response = await Series.find().select("-__v");
  res.json({ status, response });
  // Series.find().then(response => {
  //   res.json({ status, response });
  // });
});

router.post("/", async (req, res, next) => {
  const status = 201;
  try {
    const response = await Series.create(req.body);
    res.json({ status, response });
  } catch (error) {
    console.error(error);
    const e = new Error("Something went bad");
    e.status = 400;
    next(e);
  }
  // Series.create({
  //   title: "Stranger Things",
  //   start_year: 2016,
  //   season_count: 3
  // }).then(response => {
  //   res.json({ status, response });
  // });
  // res.json({ status, response }).catch(error => {
  //   console.error(error);
  //   const e = new Error("Something went bad");
  //   e.status = next();
  // });
});

router.get("/:id", async (req, res, next) => {
  const status = 200;
  //const response = await Series.findOne({_id: req.params.id})
  //const response = await Series.find({ _id: req.params.id });
  const response = await Series.findById(req.params.id);
  // Series.findById(req.params.id).then(response => {
  //   res.json({ status, response });
  // });
  res.json({ status, response });
});

router.put("/:id", async (req, res, next) => {
  const status = 200;
  const response = await Series.findOneAndUpdate(
    { _id: req.params.id },
    { title: req.body.title },
    { new: true }
  );
  // const single = series.find(({ id }) => id === req.params.id);
  // const index = series.indexOf(single);
  // series.splice(index, 1, response);
  res.json({ status, response });
});

router.delete("/:id", async (req, res, next) => {
  const status = 200;
  const response = await Series.findOneAndDelete({ _id: req.params.id });
  // const index = series.indexOf(response);
  // series.splice(index, 1);
  res.json({ status, response });
});

// router.put("/:id/characters", async (req, res, next) => {
//   const status = 200;
//   const response = await Series.findOneAndUpdate(
//     { _id: req.params.id },
//     { title: req.body.title },
//     { new: true }
//   );
//   // const single = series.find(({ id }) => id === req.params.id);
//   // const index = series.indexOf(single);
//   // series.splice(index, 1, response);
//   res.json({ status, response });
// });

// //gets the characters object for a given series id
// router.get("/:id/characters", async (req, res, next) => {
//   const status = 200;
//   const response = await Series.findById(req.params.id).select("characters");
//   res.json({ status, response });
// });

module.exports = router;
