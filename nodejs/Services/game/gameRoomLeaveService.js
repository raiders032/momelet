const SingleObject = require("../../SingleObjects");
const { gameRoomUpdateService } = require("./gameRoomUpdateService");
const { logger } = require("../../logger");

const gameRoomLeaveService = (socket, msg) => {
  var echo = "gameRoomLeave. msg: " + msg;
  logger.info(echo);

  let retMsg = { status: "fail" };
  let user, room;

  try {
    const { id, roomName } = JSON.parse(msg);
    user = SingleObject.UserRepository.findById(id);
    room = SingleObject.RoomRepository.findByRoomName(roomName);
    if (user.joinedRoomName !== null) {
      if (room.deleteUser(user) <= 0) {
        SingleObject.RoomRepository.delete(roomName);
      } else {
        console.log("게임룸리브에서 업데이트 호출!");
        gameRoomUpdateService(socket, room, id);
      }
      user.updateJoinedRoomName(null);
      retMsg.status = "ok";
    }
  } catch (err) {
    logger.error("gameRoomLeaveService error");
    logger.error(err);
    retMsg.status = "fail";
  }

  retMsg = JSON.stringify(retMsg);
  return retMsg;
};

module.exports = {
  gameRoomLeaveService,
};
