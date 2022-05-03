/* Importing the `Router` function from the `express` module. */
const router = require("express").Router()
/* Importing the `signup` and `login` functions from the `users.controller.js` file. */
const { signup, login } = require("../controllers/users.controller")

/* Creating a route for the login and signup. */
router.route("/login").post(login)
router.route("/signup").post(signup)

module.exports = router
