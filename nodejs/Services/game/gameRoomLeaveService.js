const SingleObject = require("../../SingleObjects");
const { gameRoomUpdateService } = require("./gameRoomUpdateService");
const { logger } = require("../../logger");
const gameRoomLeaveService = (socket, msg) => {
  var echo = "gameRoomLeave. msg: " + msg;
  logger.info(echo);

  let retMsg = { status: "fail" };
  const { id, roomName } = JSON.parse(msg);
  const room = SingleObject.RoomRepository.findByRoomName(roomName);
  const user = SingleObject.UserRepository.findById(id);

  if (user.joinedRoomName !== null) {
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
  }

  retMsg = JSON.stringify(retMsg);
  return retMsg;
};

module.exports = {
  gameRoomLeaveService,
};
