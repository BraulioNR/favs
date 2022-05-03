const { Schema, model, models } = require("mongoose")
const bcrypt = require("bcrypt")

/* A regular expression that checks if the email and password are valid. */
const emailRegexp =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const passwordRegexp =
  /^(?!.*\s)(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹]).{8,}$/

/* Creating a schema for the user model. */
const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "The email is required"],
      trim: true,
      match: [emailRegexp, "The email format is invalid"],
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
      required: [true, "The password is required"],
      match: [passwordRegexp, "The password is insecure"],
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

/* A middleware that is executed before the user is saved to the database. It checks if the password
has been modified and if it has, it hashes it. */
userSchema.pre("save", async function () {
  if (this.password && this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10)
  }
})

const User = model("User", userSchema)
module.exports = User
