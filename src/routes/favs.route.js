const router = require("express").Router()
/* This is destructuring the favs.controller.js file. */
const {
  create,
  list,
  update,
  show,
  destroy,
} = require("../controllers/favs.controller")
const { isAuthenticated } = require("../utils/auth")

/* Creating a route for the `/` path, and then adding a `post` and `get` method to it using isAuthenticated. */
router.route("/").post(isAuthenticated, create).get(isAuthenticated, list)
/* Creating a route for the `/:id` path, and then adding a `get`, `delete`, and `put` method to it using isAuthenticated. */
router
  .route("/:id")
  .get(isAuthenticated, show)
  .delete(isAuthenticated, destroy)
  .put(isAuthenticated, update)
module.exports = router
