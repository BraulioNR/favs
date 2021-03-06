const User = require("../models/users.model")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

/* This is the signup function. It is creating a new user and returning a token. */
exports.signup = async (req, res) => {
  try {
    const { body } = req
    const user = await User.create(body)
    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
      expiresIn: 60 * 60 * 24 * 365,
    })
    res.status(201).json({ token })
  } catch (e) {
    res.status(400).json({ error: e })
  }
}

/* This is the login function. Checking if the user exists and if the password is valid. If it is, it returns a token, else return Error. */
exports.login = async (req, res) => {
  try {
    const {
      body: { email, password },
    } = req
    const user = await User.findOne({ email })
    if (!user || !password) {
      throw new Error("Invalid email or password")
    }
    const isValid = await bcrypt.compare(password, user.password)

    if (!isValid) {
      throw new Error("Invalid email or password")
    }
    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
      expiresIn: 60 * 60 * 24 * 365,
    })
    res.status(201).json({ token })
  } catch (e) {
    res.status(400).json({ error: e.message })
  }
}
