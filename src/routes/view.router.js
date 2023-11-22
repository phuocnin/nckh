const express = require("express");
const topicModel = require("../models/topic.model");
const Router = express.Router();

Router.get("/login", (req, res) => {
  res.status(200).render("login");
});

//home 
// done href
Router.get("/", async (req, res) => {
  const topics = await topicModel.find();
  res.status(200).render("home", { topics });
});


//xem đề tài


Router.get("/topic/:id", async (req, res) => {
  const topic = await topicModel.findById(req.params.id);
  res.status(200).render("view_topic", { topic });
});
//  done  href
Router.get("/user", async (req, res) => {
  // const topics = await topicModel.findById(req.params.id);
  res.status(200).render("view_user");
});
//list đề tài
// done href

Router.get("/topic", async (req, res) => {
  // const topics = await topicModel.findById(req.params.id);
  res.status(200).render("project_list");
});
Router.get("/manageprogress", async (req, res) => {
  // const topics = await topicModel.findById(req.params.id);
  res.status(200).render("manageprogress");
});
Router.get("/managetask", async (req, res) => {
  // const topics = await topicModel.findById(req.params.id);
  res.status(200).render("managetask");
});
Router.get("/manageusers", async (req, res) => {
  // const topics = await topicModel.findById(req.params.id);
  res.status(200).render("manageusers");
});

// thêm đề tài
Router.get("/new_topic", async (req, res) => {
  // const topics = await topicModel.findById(req.params.id);
  res.status(200).render("newproject");
});
Router.get("/report", async (req, res) => {
  // const topics = await topicModel.findById(req.params.id);
  res.status(200).render("report");
});

Router.get("/newuser", async (req, res) => {
  // const topics = await topicModel.findById(req.params.id);
  res.status(200).render("new_user");
});
Router.get("/userlist", async (req, res) => {
  // const topics = await topicModel.findById(req.params.id);
  res.status(200).render("userlist");
});

module.exports = Router;
