const router = require("express").Router({ mergeParams: true });
const Series = require("../models/series");

router.get("/", async (req, res, next) => {
  const status = 200;
  const { characters } = await Series.findById(req.params.seriesId).select(
    "characters"
  );
  res.json({ status, characters });
});

router.put("/:id", async (req, res, next) => {
  const status = 200;
  const series = await Series.findById(req.params.seriesId).select(
    "characters"
  );

  const character = series.characters.id(req.params.id);
  Object.assign(character, req.body);
  await series.save();
  res.status(status).json({ status, character });
});
