const SingleObject = require("../../SingleObjects");
const gameRoomUpdateService = require("./gameRoomUpdateService");

const gameRoomJoinService = (socket, msg) => {
  var echo = "gameRoomJoin 이벤트. 받은 msg: " + msg;
  console.log(echo);

  const { id, roomName } = JSON.parse(msg);
  const room = SingleObject.RoomRepository.findByRoomName(roomName);
  const user = SingleObject.UserRepository.findById(id);

  if (room.isStarted()) {
    const ret = JSON.stringify({
      status: "fail",
      roomName: null,
      gameRoomUserList: null,
      hostId: null,
    });
    return ret;
  }

  room.addUser(user);

  socket.join(roomName, () => {
    gameRoomUpdateService(socket, roomName, id);
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
