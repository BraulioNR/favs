//Cada fav tendrá un título, descripción y enlace,
const { Schema, model } = require("mongoose")

const favSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "The tile is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "The description is required"],
      trim: true,
    },
    link: {
      type: String,
      required: [true, "The link is required"],
      trim: true,
    },
    itsList: {
      type: Schema.Types.ObjectId,
      ref: "List",
      required: [true, "The list's id is required "],
    },
  },
  { timestamps: true }
)

const Fav = model("Fav", favSchema)
module.exports = Fav
