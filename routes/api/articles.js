const axios = require("axios");
const router = require("express").Router();
const articlesController = require("../../controllers/articlesController");

router.route("/")
  .get(articlesController.findAll)
  .post(articlesController.create);

router
  .route("/:id")
  .delete(articlesController.remove);

router.route("/find")

module.exports = router;