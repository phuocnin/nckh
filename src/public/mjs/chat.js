const express = require("express");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const shortid = require("shortid");
const ROOM = require("./room.js");
const PrivateRoom = require("./private_room.js");
// Import from Nguyen


let user = [];
let token = [];

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/login.html");
});
//==========================================
// Routing:
app.get("/chat", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

const allRoomObj = {};
const roomList = {};
const allPrivateRoom = {};
//==============================================
// ROOM FUNCTIONS
//==============================================
/**
 * Create a room function
 * @param {*} roomName - received from client-side
 * @param {*} clientID - received from client-side
 */
// roomID is not yet generated randomly to run tests
const createRoom = (clientId, roomName) => {
  // check if both params are passed into
  if (typeof clientId === "undefined" || typeof roomName === "undefined") {
    throw new Error("Error: params are not passed into the function");
  } else {
    let roomId = shortid.generate();
    let newRoom = new ROOM(roomId, roomName, clientId);
    allRoomObj[roomId] = newRoom;
    roomList[roomId] = roomName;
    return roomId;
  }
};

/**
 * Delete a room function
 * @param {*} clientID
 * @param {*} roomID
 */
const deleteRoom = (clientID, roomID) => {
  if (typeof clientID === "undefined" || typeof roomID === "undefined") {
    throw new Error("Error: params are not passed into the function");
  } else if (allRoomObj[roomID] === undefined) {
    throw new Error("Error: Room does not exist !!");
  } else {
    // only allows the room's creator
    let roomCreator = allRoomObj[roomID].creator;
    if (clientID !== roomCreator) {
      throw new Error("Error: Chỉ người tạo phòng mới được phép xóa nó !!");
    } else {
      delete allRoomObj[roomID];
      delete roomList[roomID];
    }
  }
};

/**
 * Clients join rooms function -> add clients to room
 * @param {*} clientID
 * @param {*} roomID
 */
const joinRoom = (clientID, roomID) => {
  if (typeof clientID === "undefined" || typeof roomID === "undefined") {
    throw new Error("Error: params are not passed into the function");
  } else if (allRoomObj[roomID] === undefined) {
    throw new Error("Error: Phòng không tồn tại !!");
  } else {
    let room = allRoomObj[roomID];
    room.addClient(clientID);
  }
};

/**
 * Clients leave rooms function -> remove clients from room
 * @param {*} clientID
 * @param {*} roomID
 */
const leaveRoom = (clientID, roomID) => {
  if (typeof clientID === "undefined" || typeof roomID === "undefined") {
    throw new Error("Error: params are not passed into the function");
  } else if (allRoomObj[roomID] === undefined) {
    throw new Error("Error: Phòng không tồn tại !!");
  } else {
    let room = allRoomObj[roomID];
    room.removeClient(clientID);
  }
};

/**
 * Clients change the room's name -> only allow the room's creator to change name
 * @param {*} clientID
 * @param {*} roomID
 * @param {*} newRoomName
 */

const changeRoomName = (clientID, roomID, newRoomName) => {
  if (
    typeof clientID === "undefined" ||
    typeof roomID === "undefined" ||
    typeof newRoomName === "undefined"
  ) {
    throw new Error("Error: params are not passed into the function");
  } else if (allRoomObj[roomID] === undefined) {
    throw new Error("Error: Phòng không tồn tại !!");
  } else {
    let room = allRoomObj[roomID];
    let roomCreator = allRoomObj[roomID].creator;
    if (clientID !== roomCreator) {
      throw new Error(
        "Error: Chỉ người tạo phòng mới được phép thay đổi tên phòng !!"
      );
    } else {
      room.changeName(newRoomName);
      roomList[roomID] = newRoomName;
    }
  }
};

//=============================================
// PRIVATE ROOM FUNCTIONS
//=============================================
const createPrivateRoom = (senderId, receiverId, senderName, receiverName) => {
  // check if both params are passed into
  if (
    typeof senderId === "undefined" ||
    typeof receiverId === "undefined" ||
    typeof senderName === "undefined" ||
    typeof receiverName === "undefined"
  ) {
    throw new Error("Error: params are not passed into the function");
  } else {
    let newPrivateRoom = new PrivateRoom(
      senderId,
      receiverId,
      senderName,
      receiverName
    );
    newPrivateRoom.addClient(receiverId);
    let roomId = newPrivateRoom.id;
    console.log(roomId);
    allPrivateRoom[roomId] = newPrivateRoom;
    return roomId;
  }
};

//==============================================
// SOCKET.IO EVENTS
//==============================================
const main = io.on("connection", (socket) => {
  // logout
  socket.on("logout", (tokenClient, clientId) => {
    // localStorage.removeItem("tokenClient");
    // localStorage.removeItem("clientId");
    client = user.find((ele) => ele.id === clientId);
    client.isActive = false;
    // alert(data["msg"]);
    socket.emit("logout_success", {
      msg: "Do you want to log out?",
    });
  });
  // receive clientId when an user logins
  socket.on("send clientId", (id) => {
    
    socket.join("main");
    //============================
    let clientId = id;
   
    let connectClient = user.find((ele) => ele.id === clientId);

    if (connectClient == undefined) {
      io.sockets.emit("login aganst");
    } else {
     
      connectClient.socketId = socket.id;

      socket.username = connectClient.username;
      io.to(socket.id).emit("reconnect", connectClient, roomList);
      io.sockets.emit("user connect", connectClient, roomList, user);
    }
  });
 
  // IMPORT FROM
  auth(socket, user, token);
 
  socket.on("send private", (senderId, receiverId) => {
    
    let sender = user.find((ele) => ele.id === senderId);
    let receiver = user.find((ele) => ele.id === receiverId);
    
    let senderFriend = sender.friend;
  
    if (senderFriend.hasOwnProperty(receiverId)) {
      let roomId = senderFriend[receiverId];
      let roomName = allPrivateRoom[roomId].name;
    
      socket.emit(
        "create private chat",
        roomId,
        roomName,
        sender.username,
        receiver.username
      );
    } else {
     
      let newRoomId = createPrivateRoom(
        senderId,
        receiverId,
        sender.username,
        receiver.username
      );
      console.log("newRoomId: " + newRoomId);
      let newRoomName = allPrivateRoom[newRoomId].name;
      // update friend list of both users
      sender.friend[receiverId] = newRoomId;
      receiver.friend[senderId] = newRoomId;
    
      socket.emit(
        "create private chat",
        newRoomId,
        newRoomName,
        sender.username,
        receiver.username
      );
    }
  });
 
  socket.on("private message", (data) => {
    // find sender in user array by socketId
    let sender = user.find((ele) => ele.socketId === socket.id);
    // get senderId
    let senderId = sender.id;
    // from roomId -> get receiverId
    let receiverId = data.roomId.split("--").find((ele) => ele !== senderId);
    // get socket.id of receiver to emit msg
    let receiverSocketId = user.find((ele) => ele.id === receiverId).socketId;
    let roomName = allPrivateRoom[data.roomId].name;
    // only emit msg to the receiver via receiverSocketId
    socket.broadcast.to(receiverSocketId).emit("private message", {
      roomId: data.roomId,
      roomName: roomName,
      username: sender.username,
      message: data.message,
    });
  });

 
  socket.on("create room", (roomName, clientId) => {
    try {
      // have user info -> use clientId not socket.id
      let newRoomId = createRoom(clientId, roomName);
      let client = user.find((ele) => ele.id === clientId);
      client.room.push(newRoomId);
      // emit a msg back to the sender
      socket.emit("new room", {
        clientName: socket.username,
        newRoomId: newRoomId,
        newRoomName: roomList[newRoomId],
      });
      io.sockets.emit("update room", roomList);
      // new code to fix room msg events -> join newly created room
      socket.join(newRoomId);
      console.log(socket.room);
      console.log(io.sockets.adapter.rooms[newRoomId]);
      //============================
    } catch (err) {
      console.log(err);
      socket.emit("create room error", socket.username, err);
    }
  });

  socket.on("join room", (clientId, roomId) => {
    // check if the client is already in the room
    let alreadyInRoom = allRoomObj[roomId].client.some(
      (ele) => ele === clientId
    );
    if (!alreadyInRoom) {
      joinRoom(clientId, roomId);
      let client = user.find((ele) => ele.id === clientId);
      client.room.push(roomId);
      // new code to fix room msg events -> join room
      // console.log(io.sockets.adapter.rooms[roomId]);
      socket.join(roomId);
      // console.log(io.sockets.adapter.rooms[roomId]);
      //============================
      // emit a msg back to the sender
      socket.emit("join room", {
        clientName: socket.username,
        roomId: roomId,
        roomName: roomList[roomId],
      });
    } else {
      socket.emit("join room error", "You are already in the room!");
    }
  });

  socket.on("leave room", (clientId, roomId) => {
    let alreadyInRoom = allRoomObj[roomId].client.some(
      (ele) => ele === clientId
    );
    if (alreadyInRoom) {
      leaveRoom(clientId, roomId);
      let client = user.find((ele) => ele.id === clientId);
      let roomIndex = client.room.indexOf(roomId);
      client.room.splice(roomIndex, 1);
      // new code to fix room msg events -> leave room
      // console.log(io.sockets.adapter.rooms[roomId]);;
      socket.leave(roomId);
      // console.log(io.sockets.adapter.rooms[roomId]);;
      //============================
      // emit a msg back to the sender
      socket.emit("left room", {
        clientName: socket.username,
        roomId: roomId,
        roomName: roomList[roomId],
      });
    } else {
      socket.emit("leave room error", "you are not in the room!");
    }
  });

  socket.on("delete room", (clientId, roomId) => {
    let roomName = roomList[roomId];
    try {
      deleteRoom(clientId, roomId);
      let client = user.find((ele) => ele.id === clientId);
      let roomIndex = client.room.indexOf(roomId);
      client.room.splice(roomIndex, 1);
      // new code to fix room msg events -> delete room
      // console.log(io.sockets.adapter.rooms[roomId]);
      // remove all clients from the room
      // get array of all clients in 'roomId'
      io.in(roomId).clients(function (error, clients) {
        if (clients.length > 0) {
          console.log("clients in the room: ");
          console.log(clients);
          clients.forEach(function (socket_id) {
            // clients leave room
            io.sockets.sockets[socket_id].leave(roomId);
          });
        }
      });
    
      io.sockets.emit("deleted room", roomId, roomName, roomList);
    } catch (err) {
      console.log(err);
      // emit a msg back to the sender
      socket.emit("delete room error", err.message);
    }
  });

 
  socket.on("chat message", (data) => {
    // emit msg to clients in the room only
    socket.broadcast.to(data.roomId).emit("chat message", {
      roomId: data.roomId,
      username: socket.username,
      message: data.message,
    });
  });
});

