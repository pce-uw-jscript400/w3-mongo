const router = require('express').Router({ mergeParams: true })
const Series = require('../models/series');

router.get('/', async (req, res, next) => {
    const status = 200; 
    const { characters } = await Series.findById(req.params.seriesId).select('characters');

    res.json({ status, characters });
});

module.exports = router;