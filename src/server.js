require("dotenv").config()
const express = require("express")
const cors = require("cors")
const { connect } = require("./database")

const port = process.env.PORT
const app = express()

app.use(express.json())
app.use(cors())
connect()

app.get("/", (req, res) => {
  res.status(200).json({ message: "It's working" })
})

app.listen(port, () => {
  console.log(`App running at http://localhost:${port}`)
})
