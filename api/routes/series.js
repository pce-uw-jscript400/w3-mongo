const router = require("express").Router();
const { generate: generateId } = require("shortid");
const Series = require("../models/series");

const series = [
  {
    id: "j9U3iNIQi",
    name: "Buffy the Vampire Slayer"
  }
  // {
  //   id: "jaklj80980",
  //   name: "Stranger Things"
  // }
];

router.get("/", async (req, res, next) => {
  const status = 200;
  const response = await Series.find();
  res.json({ status, response });
  // Option 2
  // await Series.find().then(response => {
  //   res.json({ status, response });
  // });
});

router.post("/", async (req, res, next) => {
  const status = 201;
  const response = await Series.create({
    title: "Stranger Things",
    start_year: 2016,
    season_count: 3
  });
  res.json({ status, response });
  // Option 2
  // Series.create({
  //   title: "Stranger Things",
  //   start_year: 2016,
  //   season_count: 3
  // }).then(response => {
  //   res.json({ status, response });
  // });
});

router.get("/:id", (req, res, next) => {
  const status = 200;
  const response = series.find(({ id }) => id === req.params.id);

  res.json({ status, response });
});

router.put("/:id", (req, res, next) => {
  const status = 200;
  const response = { id: req.params.id, ...req.body };
  const single = series.find(({ id }) => id === req.params.id);
  const index = series.indexOf(single);

  series.splice(index, 1, response);

  res.json({ status, response });
});

router.delete("/:id", (req, res, next) => {
  const status = 200;
  const response = series.find(({ id }) => id === req.params.id);
  const index = series.indexOf(response);

  series.splice(index, 1);

  res.json({ status, response });
});

module.exports = router;
