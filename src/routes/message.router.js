const express = require("express");
const Router = express.Router();
const messageController = require("../controllers/api/message.controller");
const { authMiddleware } = require("../controllers/api/auth.controller");
Router.use(authMiddleware);
Router.route("/")
  .get((req, res) => {
    // Handle GET request for messages
    res.send("GET request for messages");
  })
  .post(messageController.addSender, messageController.postcouncil);

Router.route("/:id")
  .patch((req, res) => {
    // Handle PUT request for updating a message
    const messageId = req.params.id;
    res.send(`PUT request for updating message with ID ${messageId}`);
  })
  .delete((req, res) => {
    // Handle DELETE request for deleting a message
    const messageId = req.params.id;
    res.send(`DELETE request for deleting message with ID ${messageId}`);
  });

module.exports = Router;
