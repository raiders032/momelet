const SingleObject = require("../../SingleObjects");

const togetherInviteService = (socket, msg) => {
  const echo = "togetherInviteService 이벤트. 받은 msg: " + msg;
  console.log(echo);

  const { id, inviteTheseUsers } = JSON.parse(msg);

  const msgSender = SingleObject.UserRepository.findById(id);
  const roomName = SingleObject.RoomRepository.add(id);
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
