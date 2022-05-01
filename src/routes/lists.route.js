const router = require("express").Router()
const {
  create,
  list,
  show,
  update,
  destroy,
} = require("../controllers/lists.controller")
const { isAuthenticated } = require("../utils/auth")

router.route("/").post(isAuthenticated, create).get(isAuthenticated, list)
router
  .route("/:id")
  .get(isAuthenticated, show)
  .delete(isAuthenticated, destroy)
  .put(isAuthenticated, update)
module.exports = router
