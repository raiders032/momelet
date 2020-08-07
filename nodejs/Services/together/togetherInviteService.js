const SingleObject = require("../../SingleObjects");

const togetherInviteService = (socket, msg) => {
  const echo = "togetherInviteService 이벤트. 받은 msg: " + msg;
  console.log(echo);

  const { inviteTheseUsers } = JSON.parse(msg);

  const msgSender = SingleObject.UserList.connectedUserList.get(socket.Id);
  const roomName = msgSender.socketId + "_room";

  const inviteMsg = JSON.stringify({
    roomName,
    invitorName: msgSender.name,
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
  });
  return retMsg;
};

module.exports = {
  togetherInviteService,
};
