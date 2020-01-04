// Libraries
import React from "react";

const Input = ({ onMessageChange, sendMessage, message }) => {
  return (
    <form>
      <input
        type="text"
        placeholder="Message..."
        value={message}
        onChange={onMessageChange}
        onKeyPress={e => (e.key === "Enter" ? sendMessage(e) : null)}
      />
      <button onClick={e => sendMessage(e)}>Send</button>
    </form>
  );
};

export default Input;
