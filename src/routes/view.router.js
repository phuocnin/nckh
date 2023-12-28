const express = require("express");
const userModel = require("../models/user.model");
const councilModel = require("../models/council.model");
const viewController = require("../controllers/view.controller");
const { authMiddleware } = require("../controllers/auth.controller");
const Router = express.Router();

//login
Router.get("/login", (req, res) => {
  res.status(200).render("login");
});
Router.get("/quenmk", (req, res) => {
  res.status(200).render("quenmk");
});
Router.get("/xacnhan", (req, res) => {
  res.status(200).render("xacnhan");
});
Router.use(authMiddleware);

//home
Router.get("/", viewController.home);

//xem đề tài
Router.get("/topic/:id", authMiddleware, viewController.getTopic);

//Xem user
Router.get("/users/:id", viewController.getUser);
Router.get("/me", authMiddleware, viewController.getMe, viewController.getUser);
//list đề tài
Router.get("/topics", viewController.getTopics);
Router.get("/my_topics", authMiddleware, viewController.getTopics);

// thêm đề tài
Router.get("/new_topic", async (req, res) => {
  res.status(200).render("new_topic");
});
// thêm hội đồng
Router.get("/new_council", async (req, res) => {
  res.status(200).render("new_council");
});

// thêm đề tài
Router.get("/rating", viewController.getRating);

// wiew pdf

Router.get("/newuser", async (req, res) => {
  res.status(200).render("new_user");
});
Router.get("/users", async (req, res) => {
  const users = await userModel.find();
  res.status(200).render("user_list", { users });
});
Router.get("/councillist", async (req, res) => {
  const councils = await councilModel.find().populate("ChuTich");
  res.status(200).render("council_list", { councils });
});
Router.get("/report", async (req, res) => {
  res.status(200).render("report");
});
Router.get("/manageprogress", async (req, res) => {
  res.status(200).render("manageprogress");
});
Router.get("/managetask", async (req, res) => {
  res.status(200).render("managetask");
});
Router.get("/notify", async (req, res) => {
  res.status(200).render("notify");
});
Router.get("/chat", async (req, res) => {
  res.status(200).render("chat");
});
Router.get("/chatbox", async (req, res) => {
  res.status(200).render("MessagesPanel");
});

Router.get("/notify/:id", viewController.viewNotify);
Router.get("/editnotify/:id", viewController.editNotify);
Router.get("/fixuser/:id", async (req, res) => {
  res.status(200).render("edituser");
});
Router.get("/changepass", authMiddleware, async (req, res) => {
  res.status(200).render("changepass");
});
Router.get("/meeting", authMiddleware, async (req, res) => {
  res.status(200).render("meeting");
});
module.exports = Router;
