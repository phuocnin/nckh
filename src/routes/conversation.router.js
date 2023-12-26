const express = require("express");
const conversationController = require("../controllers/api/conversation.controller");
const { authMiddleware } = require("../controllers/api/auth.controller");
const Router = express.Router();

Router.use(authMiddleware);

Router.route("/")
  .get(
    conversationController.addUserIdToQuery,
    conversationController.getConversations
  )
  .post(
    conversationController.conversationExists,
    conversationController.postConversation
  );

Router.route("/:id")
  .get(conversationController.getConversation)
  .patch(conversationController.updateConversation)
  .delete(conversationController.deleteConversation);

module.exports = Router;
