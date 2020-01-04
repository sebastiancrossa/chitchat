// Libraries
const express = require("express");
const socketio = require("socket.io");
const http = require("http");
const cors = require("cors");

const { addUser, removeUser, getUser, getUsersInRoom } = require("./users");

const router = require("./router");

// Initialization
const app = express();
const server = http.createServer(app);
const io = socketio(server);
const PORT = process.env.PORT || 5000;

// SocketIO
io.on("connection", socket => {
  // Do when a socket emits the event 'join'
  socket.on("join", ({ name, room }, callback) => {
    const { error, user } = addUser({
      // We desctructure error and user because the funcion only returns one of those two
      id: socket.id,
      name,
      room
    });

    if (error) return callback(error);

    socket.join(user.room);
  });

  socket.on("disconnect", () => {
    console.log("Connection left --");
  });
});

// Middleware
app.use(router);
app.use(cors());

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
