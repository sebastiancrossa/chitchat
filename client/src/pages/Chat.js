// Libraries
import React, { useState, useEffect } from "react";
import useInputState from "./../hooks/useInputState";
import queryString from "query-string";
import io from "socket.io-client";

// Component Imports
import InfoBar from "../containers/Chat/InfoBar";
import Messages from "../containers/Chat/Messages";
import Input from "../containers/Chat/Input";
import TextContainer from "../containers/Chat/TextContainer";

let socket;

const Chat = ({ location }) => {
  const [name, setName] = useState("");
  // eslint-disable-next-line
  const [room, setRoom] = useState("");
  // eslint-disable-next-line
  const [message, setMessage, onMessageChange, resetMessage] = useInputState(
    ""
  );
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);

  const ENDPOINT = "https://chitchat-backend.herokuapp.com/";

  useEffect(() => {
    const { name, room } = queryString.parse(location.search);

    socket = io(ENDPOINT, { transports: ["websocket"] });

    setName(name);
    setRoom(room);

    socket.emit("join", { name, room }, error => {
      if (error) alert(error);
    });
  }, [ENDPOINT, location.search]);

  // In charge of handling the messages sent by the users
  useEffect(() => {
    socket.on("message", message => {
      setMessages([...messages, message]);
    });

    socket.on("roomData", ({ users }) => {
      setUsers(users);
    });

    // Called when unmounted
    return () => {
      socket.emit("disconnect");
      socket.off();
    };
  }, [messages]);

  const sendMessage = e => {
    e.preventDefault();

    if (message) {
      socket.emit("sendMessage", message, () => resetMessage());
    }
  };

  return (
    <div>
      <div>
        <InfoBar />
        <Messages messages={messages} name={name} />
        <Input
          message={message}
          onMessageChange={onMessageChange}
          sendMessage={sendMessage}
        />
        <TextContainer users={users} />
      </div>
    </div>
  );
};

export default Chat;
