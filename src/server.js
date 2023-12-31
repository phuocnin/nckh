const app = require("./app.js");
const dotenv = require("dotenv");
const http = require("http");
const mongoose = require("mongoose");
const { Server } = require("socket.io");
//config dotenv
dotenv.config();
const port = process.env.PORT || 8080;
const httpServer = http.createServer(app);

//connect DB
mongoose
  .connect(process.env.DATABASE_LOCAL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connect DB oke!");
  });
//socket
const io = new Server(httpServer);
io.on("connection", (socket) => {
  console.log("a user connected");
  io.on("connection", (socket) => {
    socket.on("chat message", (msg) => {
      io.emit("chat message", msg.message);
    });
  });
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});
httpServer.listen(port, () => {
  console.log(`http://localhost:${port}/`);
});
