const SingleObject = require("../../SingleObjects");
const { logger } = require("../../logger");

const gameUserFinishService = (socket, msg) => {
  var echo = "gameRoomUserFinish. msg: " + msg;
  logger.info(echo);

  let retMsg = {
    status: "fail",
    roomName: null,
  };

  const { id, userGameResult, roomName } = JSON.parse(msg);
  const user = SingleObject.UserRepository.findById(id);
  const room = SingleObject.RoomRepository.findByRoomName(roomName);

  if (user.canReceive === true) {
    user.updateCanReceive(false);
    if (userGameResult.length === 7) {
      for (let result of userGameResult) {
        room.addScore(result.id, result.sign);
      }
    } else {
      console.log("유저 게임이 제대로 종료되지 않아 결과가 반영되지 않았음");
    }
    room.addFinishCount();
  }
  retMsg.status = "wait";
  retMsg.roomName = roomName;

  retMsg = JSON.stringify(retMsg);
  return retMsg;
};

module.exports = {
  gameUserFinishService,
};
