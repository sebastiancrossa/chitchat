const users = [];

const addUser = ({ id, name, room }) => {
  name = name.trim().toLowerCase();
  room = room.trim().toLowerCase();

  // Check to see if a user already exists with the passed name
  const existingUser = users.find(
    user => user.room === room && user.name === name
  );

  if (existingUser) {
    return { error: "Username already taken" };
  }

  const user = {
    id,
    name,
    room
  };

  users.push(user);

  return { user };
};

const removeUser = id => {
  const index = users.findIndex(user => user.id === id);

  // If a user exists with the passed id, remove the user
  if (index !== -1) {
    return users.filter(user => user.id === id);
  }
};

const getUser = id => users.find(user => user.id === id);

const getUsersInRoom = room => users.filter(user => user.room === room);

module.exports = {
  addUser,
  removeUser,
  getUser,
  getUsersInRoom
};
