const users = [];

const addUser = ({ socket_id, userData, location }) => {
  location = location.trim().toLowerCase();
  
  const user = { socket_id, userData, location };
  users.push(user);

  return { user }
}

const removeUser = (socket_id) => {
  const index = users.findIndex((user) => user.socket_id === socket_id);

  if (index !== -1) {
      return users.splice(index, 1)[0];
  }
}

const getUser = (socket_id) => users.find((user) => user.socket_id === socket_id);

const getUserByEmail = (email) => users.find((user) => user.userData.email === email);

const getUserByUid = (uid) => users.find((user) => user.userData.uid === uid);

const getUserInArea = (location) => users.filter((user) => user.location === location);

module.exports = { addUser, removeUser, getUser, getUserByEmail, getUserByUid, getUserInArea };