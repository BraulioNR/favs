/* Destructuring the Schema and model from the mongoose package. */
const { Schema, model } = require("mongoose")

/* Creating a schema for the fav model. */
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
    listId: {
      type: Schema.Types.ObjectId,
      ref: "List",
      required: [true, "The list's id is required "],
    },
    creator: {
      type: Schema.Types.ObjectId,
      required: [true, "The creator's id is required"],
      ref: "User",
    },
  },
  { timestamps: true }
)

const Fav = model("Fav", favSchema)
module.exports = Fav
