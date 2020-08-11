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
      roomName: null,
      gameRoomUserList: null,
      hostId: null,
    });
    return ret;
  }

  room.addUser(user);

  socket.join(roomName, () => {
    socket.to(roomName).emit(
      "gameRoomUpdate",
      JSON.stringify({
        gameRoomUserList: room.getUserList().map((user) => {
          const { id, name, imageUrl } = user;
          const userDto = { id, name, imageUrl };
          return userDto;
        }),
        hostId: room.getHostId(),
      })
    );
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
