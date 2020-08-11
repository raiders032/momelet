const SingleObject = require("../../SingleObjects");

const gameRoomJoinService = (socket, msg) => {
  var echo = "gameRoomJoin 이벤트. 받은 msg: " + msg;
  console.log(echo);

  const { id, roomName } = JSON.parse(msg);
  const room = SingleObject.RoomRepository.findByRoomName(roomName);
  const user = SingleObject.UserRepository.findById(id);
  const roomName = room.getRoomName();

  if (room.isStarted()) {
    const ret = JSON.stringify({
      status: "fail",
      roomName: roomName,
      gameRoomUserList: room.getUserList(),
      hostId: room.getHostId(),
    });
    return ret;
  }

  room.addUser(user);

  socket.join(roomName, () => {
    socket.to(roomName).emit("gameRoomUpdate", room.getUserList());
  });

  const ret = JSON.stringify({
    status: "success",
    roomName: roomName,
    gameRoomUserList: room.getUserList(),
    hostId: room.getHostId(),
  });

  return ret;
};

module.exports = {
  gameRoomJoinService,
};
