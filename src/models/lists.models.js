//cada lista se definirá por una identificación única y un nombre.
const { Schema, model } = require("mongoose")

const listSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "The name of list is required"],
      trim: true,
    },
    creator: {
      type: Schema.Types.ObjectId,
      required: [true, "The creator's id is required"],
      ref: "User",
    },
    favs: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: "Fav",
        },
      ],
    },
  },
  { timestamps: true }
)

const List = model("List", listSchema)
module.exports = List
