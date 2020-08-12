const SingleObject = require("../../SingleObjects");
const { gameRoomUpdateService } = require("./gameRoomUpdateService");

const gameRoomLeaveService = (socket, msg) => {
  var echo = "gameRoomLeave 이벤트. 받은 msg: " + msg;
  console.log(echo);

  const { id, roomName } = JSON.parse(msg);
  const room = SingleObject.RoomRepository.findByRoomName(roomName);
  const user = SingleObject.UserRepository.findById(id);

  socket.leave(roomName, () => {
    room.deleteUser(user);
    if (room.getHeadCount() <= 0) {
      SingleObject.RoomRepository.delete(room.getRoomName());
      return;
    }
    gameRoomUpdateService(socket, roomName, id);
  });

  const retMsg = JSON.stringify({ status: "ok" });
  return retMsg;
};

module.exports = {
  gameRoomLeaveService,
};
