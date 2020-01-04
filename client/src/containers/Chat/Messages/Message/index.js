// Libraries
import React from "react";
import ReactEmoji from "react-emoji";

const Message = ({ message, name }) => {
  let sentByCurrentUser = false;
  const trimmedName = name.trim().toLowerCase();

  if (message.user === trimmedName) sentByCurrentUser = true;

  return sentByCurrentUser ? (
    <div>
      <p>{ReactEmoji.emojify(message.text)}</p>
    </div>
  ) : (
    <div>
      <p>{ReactEmoji.emojify(message.text)}</p>
      <p>{message.user}</p>
    </div>
  );
};

export default Message;
