const { Schema, model, models } = require("mongoose")
const bcrypt = require("bcrypt")

const emailRegexp =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const passwordRegexp =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "The name is required"],
      trim: true,
    },
    lastname: {
      type: String,
      required: [true, "The lastname is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "The email is required"],
      trim: true,
      match: emailRegexp,
      validate: [
        {
          async validator(email) {
            try {
              const user = await models.User.findOne({ email })
              return !user
            } catch (e) {
              return false
            }
          },
          message: "Email is already in use",
        },
      ],
    },
    password: {
      type: String,
      match: passwordRegexp,
      required: [true, "The password is required"],
    },
    lists: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: "List",
        },
      ],
    },
  },
  { timestamps: true }
)

userSchema.pre("save", async function () {
  if (this.password && this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10)
  }
})

const User = model("User", userSchema)
module.exports = User
