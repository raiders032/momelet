const SingleObject = require("../../SingleObjects");

const togetherInviteService = (socket, msg) => {
  const echo = "togetherInviteService 이벤트. 받은 msg: " + msg;
  console.log(echo);

  try {
    const { id, inviteTheseUsers } = JSON.parse(msg);

    const user = SingleObject.UserRepository.findById(id);
    const newRoom = SingleObject.RoomRepository.add(id);
    const roomName = newRoom.getRoomName();
    const inviteMsg = JSON.stringify({
      roomName,
      hostName: user.name,
    });

    // 기존 접속 방에서 나가기
    if (user.joinedRoomName !== null) {
      if (room.deleteUser(user) === 0) {
        SingleObject.RoomRepository.delete(room.getRoomName());
      } else {
        gameRoomUpdateService(socket, roomName, id);
      }
      user.updateJoinedRoomName(null);
    }
    newRoom.addUser(user);
    user.updateJoinedRoomName(roomName);

    for (let user of inviteTheseUsers) {
      socket.to(user).emit("togetherInvitation", inviteMsg);
    }

    const retMsg = JSON.stringify({
      roomName,
      gameRoomUserList: newRoom.getUserList(),
      hostId: user.id,
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
