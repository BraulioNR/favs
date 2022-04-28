const List = require("../models/lists.models")
const User = require("../models/users.model")

exports.create = async (req, res) => {
  try {
    const { body, userId } = req
    const user = await User.findById(userId)
    if (!user) {
      throw new Error("User invalid")
    }
    const list = await List.create({ ...body, creator: userId })
    user.lists.push(list._id)
    await user.save({ validateBeforeSave: false })

    res.status(201).json({ message: "List created", list })
  } catch (e) {
    res.status(401).json({ error: e.message })
  }
}

exports.list = async (req, res) => {
  try {
    const { userId } = req
    const lists = await List.find({ creator: userId }).select("name favs")
    res.status(200).json({ message: `${lists.length} lists found`, lists })
  } catch (e) {
    res.status(401).json({ error: e.message })
  }
}
exports.show = async (req, res) => {
  try {
    const {
      params: { id },
      userId,
    } = req
    const list = await List.findOne({ _id: id, creator: userId })
      .select("name favs")
      .populate("favs", "title description link")
    if (!list) {
      res.status(403).json({ message: "List did not found" })
    }
    res.status(200).json({ message: "List found", list })
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
}

exports.destroy = async (req, res) => {
  try {
    const {
      params: { id },
      userId,
    } = req
    const list = await List.findOneAndDelete({ _id: id, creator: userId })
    if (!list) {
      res.status(403).json({ message: "List did not delete" })
    }
    res.status(200).json({ message: "List deleted", list })
  } catch (e) {
    res.status(400).json({ error: e.message })
  }
}
