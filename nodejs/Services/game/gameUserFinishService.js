import * as SingleObject from "../../SingleObjects.js";
import logger from "../../logger.js";
import SocketResponse from "../../socketResponse.js";

export default (socket, msg) => {
  let response = new SocketResponse();
  var echo = "gameRoomUserFinish. msg: " + msg;
  let id, userGameResult, roomName, user, room;

  logger.info(echo);

  try {
    const parsedMsg = JSON.parse(msg);
    id = parsedMsg.id;
    userGameResult = parsedMsg.userGameResult;
    roomName = parsedMsg.roomName;
  } catch (err) {
    logger.error("gameUserFinish Msg parse error: " + err);
    response.isFail("json.parse");
    return JSON.stringify(response);
  }

  user = SingleObject.UserRepository.findById(id);
  room = SingleObject.RoomRepository.findByRoomName(roomName);

  if (user.canReceive === true) {
    room.addFinishCount();
    user.updateCanReceive(false);
    if (userGameResult.length === 7) {
      for (let result of userGameResult) {
        room.addScore(result.id, result.sign);
      }
    } else {
      logger.error("유저 게임이 제대로 종료되지 않아 결과가 반영되지 않았음");
      response.isFail("game.card.error");
      return JSON.stringify(response);
    }
  }

  response.isOk({ roomName });
  return JSON.stringify(response);
};
