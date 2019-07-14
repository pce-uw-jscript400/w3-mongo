const router = require('express').Router({ mergeParams: true })
const Series = require('../models/series')

router.get('/', async (req, res, next) => {
    const status = 200
    const { characters } = await Series.findById(req.params.seriesID).select('characters')
    res.json({ status, characters })
})

router.post('/', async (req, res, next) => {
    const status = 201
    const series = await Series.findById(req.params.seriesID)
    
    series.characters.push(req.body)
    await series.save()

    const character = series.characters[series.characters.length - 1]
    res.json({ status, character })
})

router.put('/:id', async (req, res, next) => {
    const status = 201
    const series = await Series.findById(req.params.seriesID)
    const character = await series.characters.id({ _id: req.params.id })

    character.set(req.body)
    await series.save()

    const newCharacter = series.characters[series.characters.length - 1]
    res.json({ status, newCharacter })
})

router.delete('/:id', async (req, res, next) => {
    const status = 200
    const series = await Series.findById(req.params.seriesID)
    const character = await series.characters.id({ _id: req.params.id })

    character.remove()
    await series.save()

    res.json({ status, character })
})

module.exports = router