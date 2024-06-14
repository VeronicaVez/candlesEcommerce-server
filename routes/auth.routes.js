const express = require("express")
const router = express.Router()
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const User = require("../models/User.model")
const { isAuthenticated } = require("../middleware/jwt.middleware")

const saltRounds = 10;

router.post("/signup", (req, res, next) => {

    const { email, password } = req.body

    if (email === "" || password === "") {
        res.status(400).json({ message: "Provide email and password." })
        return
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
  if (!emailRegex.test(email)) {
    res.status(400).json({ message: 'Provide a valid email address.' })
    return
  }

  if (password.length < 5) {
    res.status(400).json({ message: 'Password too short.' })
    return
    }
    
  User
    .findOne({ email })
    .then((foundUser) => {

      if (foundUser) {
        res.status(400).json({ message: "User already exists." })
        return
      }

      const salt = bcrypt.genSaltSync(saltRounds)
      const hashedPassword = bcrypt.hashSync(password, salt)

      return User.create({ email, password: hashedPassword })
    })
    .then(user => res.sendStatus(201))
    .catch(err => next(err))
})


router.post('/login', (req, res, next) => {

  const { email, password, role } = req.body

  console.log(req.body)

  if (email === '' || password === '') {
    res.status(400).json({ message: "Provide email and password." })
    return
  }

  User
    .findOne({ email })
    .then((foundUser) => {

      if (!foundUser) {
        res.status(401).json({ message: "User not found." })
        return
      }

      const passwordCorrect = bcrypt.compareSync(password, foundUser.password)

      if (passwordCorrect) {

        const { name, email, _id, role } = foundUser
        const payload = { name, email, _id, role }

        const authToken = jwt.sign(
          payload,
          process.env.TOKEN_SECRET,
          { algorithm: 'HS256', expiresIn: "6h" }
        )

        res.json({ authToken })
      }

      else {
        res.status(401).json({ message: "Unable to authenticate the user" });
      }
    })
    .catch(err => next(err))
})

router.get('/verify', isAuthenticated, (req, res, next) => {
  res.json({ userInfo: req.payload })
})

module.exports = router