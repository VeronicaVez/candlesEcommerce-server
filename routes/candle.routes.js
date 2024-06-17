const mongoose = require("mongoose")
const router = require("express").Router()

const Candle = require("../models/Candle.model")

const { isAuthenticated } = require("./../middleware/jwt.middleware")

router.post("/", (req, res, next) => {

    const { name, description, price, aroma, image } = req.body
    
    Candle
        .create({ name, description, price, aroma, image })
        .then(newCandle => res.json(newCandle))
        .catch(err=>next(err))
})

router.get("/", (req, res, next) => {

    Candle
        .find()
        .then(allCandles => res.json(allCandles))
        .catch(err=>next(err))
})

router.get("/:candleId"), (req, res, next) => {

    const { candleId } = req.params

    if (!mongoose.Types.ObjectId.isValid(candleId)) { 
        res.status(400).json({ message: "Specified id is not valid." })
        return
    }

    Candle
        .findById(candleId)
        .then(candle => res.json(candle))
        .catch(err=>next(err))
}

router.put("/:candleId"), isAuthenticated, (req, res, next) => {

    const { candleId } = req.params
    const { name, description, price, aroma, image } = req.body

    if (!mongoose.Types.ObjectId.isValid(candleId)) {
        res.status(400).json({ message: "Specified id is not valid." })
        return
    }

    Candle
        .findByIdAndUpdate(candleId, { name, description, price, aroma, image }, { new: true, runValidators: true })
        .then(updatedCandle => res.json(updatedCandle))
        .catch(err=>next(err))
}

router.delete("/:candleId"), isAuthenticated, (req, res, next) => {

    const { candleId } = req.params

    if (!mongoose.Types.ObjectId.isValid(candleId)) {
        res.status(400).json({message: "Specified id is not valid"})
        return
    }

    Candle
        .findByIdAndDelete(candleId)
        .then(() => res.sendStatus(204))
        .catch(err=>next(err))
}

module.exports = router