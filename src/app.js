const path = require("path")
require("dotenv").config({
  path: path.resolve(
    __dirname,
    process.env.NODE_ENV !== "production"
      ? `../.env.${process.env.NODE_ENV}`
      : "../.env"
  ),
})
const express = require("express")
const cors = require("cors")
const userRouter = require("./routes/users.route")
const listRouter = require("./routes/lists.route")
const favRouter = require("./routes/favs.route")
const morgan = require("morgan")
const app = express()

app.use(express.json())
app.use(cors())
app.use(morgan("dev"))

app.get("/", (req, res) => {
  res.status(200).json({ message: "It's working" })
})

app.use("/auth/local", userRouter)
app.use("/api/favs", listRouter)
app.use("/api/itemfav", favRouter)

module.exports = { app }
