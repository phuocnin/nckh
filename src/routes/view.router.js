const express = require("express");
const userModel = require("../models/user.model");
const userController = require("../controllers/user.controller");
const topicController = require("../controllers/topic.controller");
const viewController = require("../controllers/view.controller");
const { authMiddleware } = require("../controllers/auth.controller");
const Router = express.Router();

Router.get("/login", (req, res) => {
    res.status(200).render("login");
});

//home
// done href
Router.get("/", viewController.home);

//xem đề tài
Router.get("/topic/:id", authMiddleware, topicController.getTopic);
//  done  href
Router.get("/user/:id", userController.getUser);
Router.get("/me", authMiddleware, userController.getMe, userController.getUser);
//list đề tài
// done href
Router.get("/topics", topicController.getTopics);

Router.get("/manageusers", async(req, res) => {
    // const topics = await topicModel.findById(req.params.id);
    res.status(200).render("manageusers");
});

// thêm đề tài
Router.get("/new_topic", async(req, res) => {
    res.status(200).render("newproject");
});
// thêm đề tài
Router.get("/new_council", async(req, res) => {
    res.status(200).render("new_council");
});

// wiew pdf


Router.get("/newuser", async(req, res) => {
    res.status(200).render("new_user");
});
Router.get("/userlist", async(req, res) => {
    const users = await userModel.find();
    res.status(200).render("userlist", { users });
});
Router.get("/report", async(req, res) => {
    res.status(200).render("report");
});
Router.get("/manageprogress", async(req, res) => {
    res.status(200).render("manageprogress");
});
Router.get("/managetask", async(req, res) => {
    res.status(200).render("managetask");
});
Router.get("/notify", async(req, res) => {
    res.status(200).render("notify");
});
Router.get("/notify/:id", viewController.viewNotify);
Router.get("/editnotify/:id", viewController.editNotify);
Router.get("/fixuser/:id", async(req, res) => {
    res.status(200).render("edituser");
});
Router.get("/changepass", authMiddleware, async(req, res) => {
    res.status(200).render("changepass");
});
module.exports = Router;