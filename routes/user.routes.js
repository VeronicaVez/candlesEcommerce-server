const mongoose = require("mongoose")
const router = require("express").Router()

const User = require("../models/User.model")

router.get("/", (req, res, next) => {

    User
        .find()
        .then(allUsers => res.json(allUsers))
        .catch(err=>next(err))
})

router.get("/:userId", (req, res, next) => {

    const { userId } = req.params

    if (!mongoose.Types.ObjectId.isValid(userId)){
        res.status(400).json({ message: "Specified id is not valid." })
        return
    }

    User
        .findById(userId)
        .then(user => res.json(user))
        .catch(err =>next(err))
})

router.put("/:userId", (req, res, next) => {

    const { userId } = req.params
    const { name, lastName, address, phoneNumber, email, password } = req.body

    if (!mongoose.Types.ObjectId.isValid(userId)){
        res.status(400).json({ message: "Specified id is not valid." })
        return
    }

    User
        .findByIdAndUpdate(userId, { name, lastName, address, phoneNumber, email, password })
        .then(updatedUser => res.json(updatedUser))
        .catch(err=>next(err))
})

router.delete("/:userId", (req, res, next) => {

    const { userId } = req.params

    if (!mongoose.Types.ObjectId.isValid(userId)) {
        res.status(400).json({ message: "Specified id is not valid." })
        return
    }

    User
        .findByIdAndDelete(userId)
        .then(() => res.sendStatus(204))
        .catch(err=>next(err))
})

module.exports = router