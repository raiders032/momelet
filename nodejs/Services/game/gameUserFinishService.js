const SingleObject = require("../../SingleObjects");
const { logger } = require("../../logger");

const gameUserFinishService = (socket, msg) => {
  var echo = "gameRoomUserFinish. msg: " + msg;
  logger.info(echo);

  let retMsg = {
    status: "fail",
    roomName: null,
  };

  let id, userGameResult, roomName, user, room;
  try {
    const parsedMsg = JSON.parse(msg);
    id = parsedMsg.id;
    userGameResult = parsedMsg.userGameResult;
    roomName = parsedMsg.roomName;
  } catch (err) {
    logger.error("gameUserFinish Msg parse error: " + err);
    return JSON.stringify(retMsg);
  }

  user = SingleObject.UserRepository.findById(id);
  room = SingleObject.RoomRepository.findByRoomName(roomName);

  if (user.canReceive === true) {
    user.updateCanReceive(false);
    if (userGameResult.length === 7) {
      for (let result of userGameResult) {
        room.addScore(result.id, result.sign);
      }
    } else {
      logger.error("유저 게임이 제대로 종료되지 않아 결과가 반영되지 않았음");
    }
    room.addFinishCount();
  }

  retMsg.status = "wait";
  retMsg.roomName = roomName;

  return JSON.stringify(retMsg);
};

module.exports = {
  gameUserFinishService,
};
