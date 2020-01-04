// Libraries
import React from "react";
import ReactEmoji from "react-emoji";

const Message = ({ message, name }) => {
  return (
    <div>
      <p>{message.text}</p>
      <p>{message.user}</p>
    </div>
  );
};

export default Message;
