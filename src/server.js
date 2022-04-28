require("dotenv").config()
const express = require("express")
const cors = require("cors")
const { connect } = require("./database")
const userRouter = require("./routes/users.route")
const listRouter = require("./routes/lists.route")
const favRouter = require("./routes/favs.route")
const morgan = require("morgan")
const port = process.env.PORT
const app = express()

app.use(express.json())
app.use(cors())
app.use(morgan("dev"))
connect()

app.get("/", (req, res) => {
  res.status(200).json({ message: "It's working" })
})

app.use("/auth/local", userRouter)
app.use("/api/favs", listRouter)
app.use("/api/itemfav", favRouter)
app.listen(port, () => {
  console.log(`App running at http://localhost:${port}`)
})
