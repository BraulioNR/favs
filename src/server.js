const { connect, disconnect, cleanup } = require("./database")
const { app } = require("./app")

const port = process.env.PORT || 8000
connect()

app.listen(port, () => {
  console.log(`App running at http://localhost:${port}`)
})
