const path = require("path");
const express = require("express");
const userRouter = require("./routes/user.router.js");
const topicRouter = require("./routes/topic.router.js");
const viewRouter = require("./routes/view.router.js");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const error = require("./utils/error");

const app = express();

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

// Serving static files
app.use(express.static(path.join(__dirname, "public")));

app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/users", userRouter);
app.use("/api/v1/topics", topicRouter);
app.use("/", viewRouter);
app.all("*", (req, res, next) => {
  next(new error(`Can't find url: ${req.originalUrl} on this server!!!`, 400));
});

module.exports = app;
