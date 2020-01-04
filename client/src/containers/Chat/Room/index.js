// Libraries
import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import queryString from "query-string";
import io from "socket.io-client";

let socket;

const Room = ({ location }) => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const ENDPOINT = "localhost:5000";

  useEffect(() => {
    const { name, room } = queryString.parse(location.search);

    socket = io(ENDPOINT, { transports: ["websocket"] });

    setName(name);
    setRoom(room);

    console.log(socket);
  }, [ENDPOINT, location.search]);

  return (
    <div>
      <p>This is the chat room</p>
    </div>
  );
};

export default withRouter(Room);
