const express = require("express");
const topicModel = require("../models/topic.model");
const userModel = require("../models/user.model");
const userController = require("../controllers/user.controller");
const topicController = require("../controllers/topic.controller");
const Router = express.Router();

Router.get("/login", (req, res) => {
  res.status(200).render("login");
});

//home
// done href
Router.get("/", topicController.home);

//xem đề tài
Router.get("/topic/:id", topicController.getTopic);
//  done  href
Router.get("/user/:id", userController.getUser);

//list đề tài
// done href

Router.get("/topics", topicController.getTopics);

Router.get("/manageusers", async (req, res) => {
  // const topics = await topicModel.findById(req.params.id);
  res.status(200).render("manageusers");
});

// thêm đề tài
Router.get("/new_topic", async (req, res) => {
  res.status(200).render("newproject");
});

Router.get("/newuser", async (req, res) => {
  res.status(200).render("new_user");
});
Router.get("/userlist", async (req, res) => {
  const users = await userModel.find();
  res.status(200).render("userlist", { users });
});
Router.get("/report", async (req, res) => {
  res.status(200).render("report");
});
Router.get("/manageprogress", async (req, res) => {
  res.status(200).render("manageprogress");
});
Router.get("/managetask", async (req, res) => {
  // const topics = await topicModel.findById(req.params.id);
  res.status(200).render("managetask");
});
Router.get("/notify", async (req, res) => {
  // const topics = await topicModel.findById(req.params.id);
  res.status(200).render("notify");
});
Router.get("/thongbao", async (req, res) => {
  // const topics = await topicModel.findById(req.params.id);
  res.status(200).render("thongbao");
});
Router.get("/fixuser", async (req, res) => {
  // const topics = await topicModel.findById(req.params.id);
  res.status(200).render("fixuser");
});
Router.get("/changepass", async (req, res) => {
  // const topics = await topicModel.findById(req.params.id);
  res.status(200).render("changepass");
});
module.exports = Router;
