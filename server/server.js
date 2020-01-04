// Libraries
const express = require("express");
const socketio = require("socket.io");
const http = require("http");
const cors = require("cors");

const router = require("./router");

// Initialization
const app = express();
const server = http.createServer(app);
const io = socketio(server);
const PORT = process.env.PORT || 5000;

// SocketIO
io.on("connection", socket => {
  console.log("New connection --");

  socket.on("disconnect", () => {
    console.log("Connection left --");
  });
});

// Middleware
app.use(router);
app.use(cors());

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
