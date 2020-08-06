const SingleObject = require("../SingleObjects");

const togetherInviteService = (socket, msg) => {
  const socketId = socket.id;
  const roomName = socketId + "_room";
  const inviteUsers = msg;

  // 방장 접속
  socket.join(roomName);
  SingleObject.UserList.setUserConnectedRoomName(socketId, roomName);

  for (let user of inviteUsers) {
    socket.to(user).emit("togetherInvite", roomName);
  }
  return roomName;
};

module.exports = {
  togetherInviteService,
};
