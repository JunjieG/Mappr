const users = [];

const addUser = ({ socket_id, uid, room }) => {
  uid = uid.trim().toLowerCase();
  room = room.trim().toLowerCase();
  
  const user = { socket_id, uid, room };
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

const getUserUID = (uid) => users.find((user) => user.uid === uid);

const getUserInRoom = (room) => users.filter((user) => user.room === room);

module.exports = { addUser, removeUser, getUser, getUserUID, getUserInRoom };