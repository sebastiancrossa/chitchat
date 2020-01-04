// Libraries
import React from "react";
import ReactEmoji from "react-emoji";

const Message = ({ message: { user, text }, name }) => {
  let sentByCurrentUser = false;
  const trimmedName = name.trim().toLowerCase();

  if (user === trimmedName) sentByCurrentUser = true;

  return sentByCurrentUser ? (
    <div>
      <p>{ReactEmoji.emojify(text)}</p>
    </div>
  ) : (
    <div>
      <p>{ReactEmoji.emojify(text)}</p>
      <p>{user}</p>
    </div>
  );
};

export default Message;
