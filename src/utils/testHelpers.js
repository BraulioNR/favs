const jwt = require("jsonwebtoken")
const User = require("../models/users.model")
const List = require("../models/lists.models")
const Fav = require("../models/favs.model")

exports.createUser = async ({ email, password }) => {
  return User.create({ email, password })
}

exports.generateToken = (user) => {
  return jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
    expiresIn: 60 * 60 * 24 * 365,
  })
}

exports.createList = async ({ name = "List 1", userId }) => {
  return List.create({ name, creator: userId })
}

exports.createFav = async ({
  title = "Title Fav",
  description = "Description Fav",
  link = "www.makeitreal.com",
  listId,
  userId,
}) => {
  return Fav.create({
    title,
    description,
    link,
    listId: listId,
    creator: userId,
  })
}
