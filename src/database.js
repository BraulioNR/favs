const mongoose = require("mongoose")
const connect = () => {
  mongoose.connect("mongodb://localhost:27017/dbgo")
  mongoose.connection.once("open", () => {
    console.log("Databse sucessfully connected")
  })
  mongoose.connection.on("error", () => {
    console.log("Something went wrong")
  })
}

module.exports = { connect }