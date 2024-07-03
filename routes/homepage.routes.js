const mongoose = require("mongoose")
const router = require("express").Router()

const Candle = require("../models/Candle.model")

router.get("/", (req, res, next) => {
    Candle
        .find()
        .then(allCandles => res.json(allCandles))
        .catch(err=>next(err))
})

module.exports = router