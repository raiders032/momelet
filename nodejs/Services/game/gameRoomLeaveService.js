const SingleObject = require("../../SingleObjects");
const { gameRoomUpdateService } = require("./gameRoomUpdateService");

const gameRoomLeaveService = (socket, msg) => {
  var echo = "gameRoomLeave 이벤트. 받은 msg: " + msg;
  console.log(echo);

  let retMsg = { status: "fail" };
  const { id, roomName } = JSON.parse(msg);
  const room = SingleObject.RoomRepository.findByRoomName(roomName);
  const user = SingleObject.UserRepository.findById(id);

  try {
    if (room.deleteUser(user) === 0) {
      SingleObject.RoomRepository.delete(room.getRoomName());
    } else {
      gameRoomUpdateService(socket, roomName, id);
    }
    user.updateJoinedRoomName(null);
    retMsg.status = "ok";
  } catch (err) {
    console.log(err);
  }

  retMsg = JSON.stringify(retMsg);
  return retMsg;
};

module.exports = {
  gameRoomLeaveService,
};
