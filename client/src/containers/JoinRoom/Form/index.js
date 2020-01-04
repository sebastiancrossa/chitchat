// Libraries
import React from "react";
import { Link } from "react-router-dom";
import useInputState from "../../../hooks/useInputState";

const Form = () => {
  const [name, setName, onNameChange, resetName] = useInputState("");
  const [room, setRoom, onRoomChange, resetRoom] = useInputState("");

  const handleSignIn = () => {
    console.log("User signed in!");
  };

  const isInvalid = name === "" || room === "";

  return (
    <div>
      <h1>Join</h1>

      <div style={{ marginBottom: "1rem" }}>
        <p>Name:</p>
        <input
          type="text"
          placeholder="Name..."
          value={name}
          onChange={onNameChange}
        />
      </div>

      <div style={{ marginBottom: "1rem" }}>
        <p>Room:</p>
        <input
          type="text"
          placeholder="Room name..."
          value={room}
          onChange={onRoomChange}
        />
      </div>

      <Link to={`/chat?name=${name}&room=${room}`}>
        <button onClick={() => handleSignIn()} disabled={isInvalid}>
          Sign In
        </button>
      </Link>
    </div>
  );
};

export default Form;
