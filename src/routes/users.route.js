const router = require("express").Router()
const { signup, login } = require("../controllers/users.controller")

router.route("/login").post(login)
router.route("/signup").post(signup)

module.exports = router
