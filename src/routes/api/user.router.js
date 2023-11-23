const express = require("express");
const usercontroller = require("../../controllers/api/user.controller.js");
const authcontroller = require("../../controllers/api/auth.controller.js");
const Router = express.Router();

Router.route("/login").post(authcontroller.login);
Router.route("/signup").post(authcontroller.createUser);

Router.use(authcontroller.authMiddleware);
Router.route("/logout").get(authcontroller.logout);
Router.route("/updatePassword").patch(authcontroller.updatePassword);
Router.route("/me")
  .get(usercontroller.getMe, usercontroller.getUser)
  .patch(usercontroller.updateMe, usercontroller.updateUser)
  .delete(usercontroller.deleteMe);

Router.route("/").get(usercontroller.getUsers);
Router.route("/:id").get(usercontroller.getUser);

module.exports = Router;
