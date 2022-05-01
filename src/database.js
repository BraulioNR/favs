const mongoose = require("mongoose")
let connection

async function connect() {
  if (connection) return
  const uri = process.env.MONGO_URI || "mongodb://localhost:27017/dbfavs"
  const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }

  connection = mongoose.connection

  connection.once("open", () => console.log("Database sucessfully connected"))
  connection.on("disconnected", () => console.log("Successfully disconnected"))
  connection.on("error", (err) => console.log("Something went wrong!", err))

  await mongoose.connect(uri, options)
}
async function disconnect() {
  if (!connection) return

  await mongoose.disconnect()
}

async function cleanup() {
  if (connection) {
    for (const collection in connection.collections) {
      await connection.collections[collection].deleteMany({})
    }
  }
}

module.exports = { connect, disconnect, cleanup }
