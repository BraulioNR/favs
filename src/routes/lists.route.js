/* Importing the `Router` function from the `express` module. */
const router = require("express").Router()
/* Importing the functions from the `lists.controller.js` file. */
const {
  create,
  list,
  show,
  update,
  destroy,
} = require("../controllers/lists.controller")
const { isAuthenticated } = require("../utils/auth")

/* Creating a route for the `/` path. It is using the `post` method to create a new list and the `get`
method to list all the lists. */
router.route("/").post(isAuthenticated, create).get(isAuthenticated, list)
/* Creating a route for the `/:id` path. It is using the `get` method to show a list, the `delete`
method to delete a list and the `put` method to update a list. */
router
  .route("/:id")
  .get(isAuthenticated, show)
  .delete(isAuthenticated, destroy)
  .put(isAuthenticated, update)
module.exports = router
