const express = require("express");
const topicController = require("../controllers/topic.controller.js");
const {
  authMiddleware,
  restrictTo,
} = require("../controllers/auth.controller.js");

const Router = express.Router();

Router.route("/")
  .get(topicController.getTopics)
  .post(authMiddleware, topicController.postTopic);

Router.route("/:id")
  .get(authMiddleware, topicController.getTopic)
  .patch(
    authMiddleware,
    topicController.filterByRole,
    topicController.updateTopic
  )
  .delete(authMiddleware, restrictTo("admin"), topicController.deleteTopic);
module.exports = Router;
