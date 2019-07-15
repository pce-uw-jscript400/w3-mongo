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
  const response = await Series.find().select("-_id -__v");
  res.json({ status, response });
});

router.post("/", async (req, res, next) => {
  const status = 201;
  try {
    const response = await Series.create(req.body);
    res.json({ status, response });
  } catch (error) {
    console.log(error);
    const e = new Error("Something went wrong");
    e.status = 400;
    next(e);
  }
});

router.get("/:id", async (req, res, next) => {
  const status = 200;
  const response = await Series.findById(req.params.id).select("-_id -__v");

  res.json({ status, response });
});

router.put("/:id", async (req, res, next) => {
  const status = 200;
  const response = await Series.findOneAndUpdate(
    { _id: req.params.id },
    { title: req.body.title },
    { start_year: req.body.start_year },
    { season_count: req.body.season_count },
    { characters: req.body.characters.name },
    { new: true }
  );

  res.json({ status, response });
});

router.delete("/:id", async (req, res, next) => {
  const status = 200;
  const response = await Series.findOneAndDelete({ _id: req.params.id }).select(
    "-_id -__v"
  );

  res.json({ status, response });
});

module.exports = router;
