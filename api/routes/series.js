const router = require("express").Router();
const { generate: generateId } = require("shortid");
const Series = require("../models/series");

const series = [
  {
    id: "j9U3iNIQi",
    name: "Buffy the Vampire Slayer"
  }
];

router.get("/", async (req, res, next) => {
  const status = 200;
  Series.find()
    .select("title  start_year season_count -_id")
    .then(response => {
      res.json({ status, response });
    });
});

router.post("/", async (req, res, next) => {
  const status = 201;
  try {
    Series.create(req.body).then(response => {
      res.json({ status, response });
    });
  } catch (error) {
    console.error(error);
    const e = new Error("Sonthing went wrong");

    e.status = 400;
    next(e);
  }
});

router.get("/:id", async (req, res, next) => {
  const status = 200;
  Series.findById(req.params.id)
    .select("title  start_year season_count -_id")
    .then(response => {
      res.json({ status, response });
    });
});

router.put("/:id", async (req, res, next) => {
  const status = 200;
  const response = await Series.findOneAndUpdate(
    { _id: req.params.id },
    { title: req.body.title },
    { new: true }
  ).select("title  start_year season_count -_id");

  res.json({ status, response });
});

router.delete("/:id", async (req, res, next) => {
  const status = 200;
  const response = await Series.findOneAndDelete({ _id: req.params.id }).select(
    "title  start_year season_count -_id"
  );

  res.json({ status, response });
});

module.exports = router;
