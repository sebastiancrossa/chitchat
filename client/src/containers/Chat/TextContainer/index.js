// Libraries
import React from "react";

export const TextContainer = ({ users }) => {
  return (
    <div>
      <p>Users online:</p>
      {users.map(user => (
        <p>{user.name}</p>
      ))}
    </div>
  );
};

export default TextContainer;
