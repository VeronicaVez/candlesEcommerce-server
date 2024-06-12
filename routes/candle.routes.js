const mongoose = require("mongoose")
const router = require("express").Router()

const Candle = require("../models/Candle.model")
const User = require("../models/User.model")

router.post("/", (req, res, next) => {

    const { name, description, price, aroma, image } = req.body
    
    Candle
        .create({ name, description, price, aroma, image })
        .then(newCandle => res.json(newCandle))
        .catch(err=>next(err))
})

router.get("/candles", (req, res, next) => {

    Candle
        .find()
        .then(allCandles => res.json(allCandles))
        .catch(err=>next(err))
})

router.get("/candles/:candleId"), (req, res, next) => {

    const { candleId } = req.params

    Candle
        .findById(candleId)
        .then(candle => res.json(candle))
        .catch(err=>next(err))
}