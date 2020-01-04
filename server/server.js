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

// Middleware
app.use(router);
app.use(cors());

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

    if (error) return callback({ error });

    socket.join(user.room);

    // Sends a welcome message when a user joins a room
    socket.emit("message", {
      user: "admin",
      text: `${user.name}, welcome to the room ${user.room}`
    });

    socket.broadcast
      .to(user.room)
      .emit("message", { user: "admin", text: `${user.name} has joined` });

    callback();
  });

  // Do when a user sends a message
  socket.on("sendMessage", (message, callback) => {
    const user = getUser(socket.id);

    io.to(user.room).emit("message", { user: user.name, text: message });

    callback();
  });

  socket.on("disconnect", () => {
    console.log("Connection left --");
  });
});

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
