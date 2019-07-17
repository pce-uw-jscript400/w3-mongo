const router = require("express").Router();
const { generate: generateId } = require("shortid");
const Series = require("../models/series");


const publicKeys = "_id title start_year season_count characters";

router.get("/", async (req, res, next) => {
  const status = 200;
  const response = await Series.find(req.query).select(publicKeys);
  res.json({ status, response });
});

router.get("/:id", (req, res, next) => {
  const status = 200;
  const response = series.find(({ id }) => id === req.params.id);

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
    error.message = "Invalid data. Please check your POST body and try again.";

    next(error);
  }
});

router.put("/:id", async (req, res, next) => {
  const status = 200;
  //const response = { id: req.params.id, ...req.body }
  //const single = series.find(({ id }) => id === req.params.id)
  const response = await Series.findById(req.params.id);

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
