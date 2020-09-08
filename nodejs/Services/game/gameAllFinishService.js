import * as SingleObject from "../../SingleObjects.js";
import logger from "../../logger.js";
import SocketResponse from "../../SocketResponse.js";

export default (socket, msg) => {
  let response = new SocketResponse();
  let data = { roomGameResult: {} };
  var echo = "gameAllFinishService. msg: " + msg;
  let id, roomName;

  logger.info(echo);

  try {
    const parsedMsg = JSON.parse(msg);
    id = parsedMsg.id;
    roomName = parsedMsg.roomName;
  } catch (err) {
    logger.error("gameAllFinish Msg parse error: " + err);
    return;
  }
  const room = SingleObject.RoomRepository.findByRoomName(roomName);
  if (room === false) return;
  if (room.getHeadCount() > room.getFinishCount()) {
    return;
  }

  const users = room.getUserList();
  const cardList = room.getCardList();
  let bestCard = { id: null, like: 0, score: 0 };
  let isLike = false;

  room.endGame();

  cardList.forEach((card, key) => {
    if (card.score > bestCard.score) {
      bestCard.score = card.score;
      bestCard.like = card.like;
      bestCard.id = key;
    }
    if (card.like > 0) isLike = true;
  });

  if (!isLike) {
    response.isFail(game.noLike);
  } else {
    data.roomGameResult.id = bestCard.id;
    data.roomGameResult.headCount = room.getHeadCount();
    data.roomGameResult.likeCount = bestCard.like;
    response.isOk(data);
  }

  setTimeout(() => {
    let retMsg = JSON.stringify(response);

    users.forEach((user) => {
      socket.to(user.socketId).emit("gameAllFinish", retMsg);
    });
    socket.emit("gameAllFinish", retMsg);

    return retMsg;
  }, 1500);

  room.resetFinishCount();
};
