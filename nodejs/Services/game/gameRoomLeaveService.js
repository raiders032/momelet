const SingleObject = require("../../SingleObjects");
const { gameRoomUpdateService } = require("./gameRoomUpdateService");
const { json } = require("express");

const gameRoomLeaveService = (socket, msg) => {
  var echo = "gameRoomLeave 이벤트. 받은 msg: " + msg;
  console.log(echo);

  const { id, roomName } = JSON.parse(msg);
  const room = SingleObject.RoomRepository.findByRoomName(roomName);
  const user = SingleObject.UserRepository.findById(id);

  room.deleteUser(user);

  if (room.getHeadCount() <= 0) {
    SingleObject.RoomRepository.delete(room.getRoomName());
    return;
  }

  socket.leave(roomName, () => {
    gameRoomUpdateService(socket, roomName, id);
  });

  // const ret = JSON.stringify({ status: "ok" });
  // return ret;
};

module.exports = {
  gameRoomLeaveService,
};
