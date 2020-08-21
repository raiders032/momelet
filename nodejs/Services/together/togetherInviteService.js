const SingleObject = require("../../SingleObjects");

const togetherInviteService = (socket, msg) => {
  const echo = "togetherInviteService 이벤트. 받은 msg: " + msg;
  console.log(echo);

  try {
    const { id, inviteTheseUsers } = JSON.parse(msg);

    const msgSender = SingleObject.UserRepository.findById(id);
    const newRoom = SingleObject.RoomRepository.add(id);
    const roomName = newRoom.getRoomName();
    const inviteMsg = JSON.stringify({
      roomName,
      hostName: msgSender.name,
    });

    newRoom.addUser(msgSender);
    msgSender.updateJoinedRoomName(roomName);

    for (let user of inviteTheseUsers) {
      socket.to(user).emit("togetherInvitation", inviteMsg);
    }

    const retMsg = JSON.stringify({
      roomName,
      gameRoomUserList: newRoom.getUserList(),
      hostId: msgSender.id,
    });
    return retMsg;
  } catch (e) {
    console.log(e);
    return echo;
  }
};

module.exports = {
  togetherInviteService,
};
