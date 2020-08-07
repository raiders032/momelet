const SingleObject = require("../../SingleObjects");

// const makeAndJoinRoom = (socket, roomName, socketId) => {
//   RoomList.makeRoom(roomName, socketId);
//   socket.join(roomName);
// };

const togetherInviteService = (socket, msg) => {
  const echo = "togetherInviteService 이벤트. 받은 msg: " + msg;
  console.log(echo);

  const { inviteTheseUsers } = JSON.parse(msg);

  const msgSender = SingleObject.UserRepository.connectedUserRepository.get(
    socket.Id
  );
  const roomName = msgSender.socketId + "_room";
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
        socketId: msgSender.socketId,
        name: msgSender.name,
        imageUrl: msgSender.imageUrl,
      },
    ],
    hostSocketId: msgSender.socketId,
  });
  return retMsg;
};

module.exports = {
  togetherInviteService,
};
