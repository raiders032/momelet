const SingleObject = require("../../SingleObjects");

// const makeAndJoinRoom = (socket, roomName, socketId) => {
//   RoomList.makeRoom(roomName, socketId);
//   socket.join(roomName);
// };

const togetherInviteService = (socket, msg) => {
  const echo = "togetherInviteService 이벤트. 받은 msg: " + msg;
  console.log(echo);

  const { id, inviteTheseUsers } = JSON.parse(msg);

  const msgSender = SingleObject.UserRepository.userRepository.get(id);
  const roomName = msgSender.id + "_room";
  // makeAndJoinRoom(socket, roomName, msgSender.socketId);
  const inviteMsg = JSON.stringify({
    roomName,
    hostName: msgSender.name,
  });

  for (let user of inviteTheseUsers) {
    socket.to(user).emit("togetherInvitation", inviteMsg);
  }

  const retMsg = JSON.stringify({
    roomName,
    gameRoomUserList: [
      {
        id: msgSender.id,
        name: msgSender.name,
        imageUrl: msgSender.imageUrl,
      },
    ],
    hostId: msgSender.id,
  });
  return retMsg;
};

module.exports = {
  togetherInviteService,
};
