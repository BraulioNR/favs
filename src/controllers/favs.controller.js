const Fav = require("../models/favs.model")
const List = require("../models/lists.models")

/* This is a function that creates a new fav. */
exports.create = async (req, res) => {
  try {
    const {
      body: { listId, ...rest },
      userId,
    } = req
    const list = await List.findById(listId)
    if (!list) {
      res.status(403).json({ message: "List invalid" })
      return
    }
    const fav = await Fav.create({ ...rest, listId: listId, creator: userId })
    list.favs.push(fav._id)
    await list.save({ validateBeforeSave: false })
    res.status(201).json({ message: "Fav created", fav })
  } catch (e) {
    res.status(400).json({ error: e.message })
  }
}

/* This is a function that finds a fav by id and returns it. */
exports.show = async (req, res) => {
  try {
    const {
      params: { id },
      userId,
    } = req
    const fav = await Fav.findOne({ _id: id, creator: userId })
    if (!fav) {
      res.status(403).json({ message: "List invalid" })
      return
    }
    res.status(201).json({ message: "Fav found", fav })
  } catch (e) {
    res.status(400).json({ error: e.message })
  }
}
/* This is a function that finds a fav by id and updates it. */
exports.update = async (req, res) => {
  const {
    body,
    params: { id },
    userId,
  } = req
  try {
    const fav = await Fav.findOneAndUpdate({ _id: id, creator: userId }, body, {
      new: true,
    })
    if (!fav) {
      res.status(403).json({ message: "Fav did not update" })
      return
    }
    res.status(201).json({ message: "Fav updated", fav })
  } catch (e) {
    res.status(400).json({ error: "An error has occurred", e })
  }
}

/* A function that finds a fav by id and deletes it. */
exports.destroy = async (req, res) => {
  try {
    const {
      params: { id },
      userId,
    } = req
    const fav = await Fav.findOneAndDelete({ _id: id, creator: userId })
    if (!fav) {
      res.status(403).json({ message: "Fav did not delete" })
      return
    }
    res.status(201).json({ message: "Fav deleted", fav })
  } catch (e) {
    res.status(400).json({ error: e.message })
  }
}

/* This is a function that finds all favs by userId and returns them. */
exports.list = async (req, res) => {
  try {
    const { userId } = req
    const favs = await Fav.find({ creator: userId })
      .select("title description link listId")
      .populate("listId", "name")
    res.status(201).json({ message: `${favs.length} favs found`, favs })
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
}
