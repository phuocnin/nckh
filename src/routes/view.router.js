const express = require("express");
const topicModel = require("../models/topic.model");
const Router = express.Router();
Router.get("/login", (req, res) => {
  res.status(200).render("login");
});
Router.get("/", async (req, res) => {
  const topics = await topicModel.find();
  res.status(200).render("home", { topics });
});

Router.get("/topic/:id", async (req, res) => {
  // const topics = await topicModel.findById(req.params.id);
  res.status(200).render("view_topic");
});
Router.get("/user", async (req, res) => {
  // const topics = await topicModel.findById(req.params.id);
  res.status(200).render("view_user");
});
module.exports = Router;