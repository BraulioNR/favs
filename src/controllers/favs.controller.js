const Fav = require("../models/favs.model")
const List = require("../models/lists.models")

exports.create = async (req, res) => {
  try {
    const {
      body: { listId, ...rest },
      userId,
    } = req
    const list = await List.findById(listId)
    if (!list) {
      throw new Error("List invalid")
    }
    const fav = await Fav.create({ ...rest, listId: listId, creator: userId })
    list.favs.push(fav._id)
    await list.save({ validateBeforeSave: false })
    res.status(200).json({ message: "Fav created", fav })
  } catch (e) {
    res.status(400).json({ error: e.message })
  }
}

exports.show = async (req, res) => {
  try {
    const {
      params: { id },
      userId,
    } = req
    const fav = await Fav.findOne({ _id: id, creator: userId })
    if (!fav) {
      throw new Error("Fav invalid")
    }
    res.status(200).json({ message: "Fav found", fav })
  } catch (e) {
    res.status(400).json({ error: e.message })
  }
}
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
    res.status(200).json({ message: "Fav updated", fav })
  } catch (e) {
    res.status(400).json({ error: "An error has occurred", e })
  }
}

exports.destroy = async (req, res) => {
  try {
    const {
      params: { id },
      userId,
    } = req
    const fav = await Fav.findOneAndDelete({ _id: id, creator: userId })
    if (!fav) {
      res.status(403).json({ message: "Fav did not delete" })
    }
    res.status(200).json({ message: "Fav deleted", fav })
  } catch (e) {
    res.status(400).json({ error: e.message })
  }
}

exports.list = async (req, res) => {
  try {
    const { userId } = req
    const favs = await Fav.find({ creator: userId })
      .select("title description link listId")
      .populate("listId", "name")
    res.status(200).json({ message: `${favs.length} favs found`, favs })
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
}
