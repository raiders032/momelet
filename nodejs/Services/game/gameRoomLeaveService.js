const SingleObject = require("../../SingleObjects");
const gameRoomUpdateService = require("./gameRoomUpdateService");

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
    gameRoomUpdateService(roomName, id);
  });

  return echo;
};

module.exports = {
  gameRoomLeaveService,
};
