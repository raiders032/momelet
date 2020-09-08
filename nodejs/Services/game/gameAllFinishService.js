import * as SingleObject from "../../SingleObjects.js";
import logger from "../../logger.js";

export default (socket, msg) => {
  var echo = "gameAllFinishService. msg: " + msg;
  logger.info(echo);
  let id, roomName;
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
  let retMsg = {
    roomGameResult: {
      result: "fail",
      id: null,
      headCount: null,
      likeCount: null,
    },
  };

  cardList.forEach((card, key) => {
    if (card.score > bestCard.score) {
      bestCard.score = card.score;
      bestCard.like = card.like;
      bestCard.id = key;
    }
    if (card.like > 0) isLike = true;
  });

  if (!isLike) {
    retMsg.roomGameResult.result = "fail";
  } else {
    retMsg.roomGameResult.result = "success";
    retMsg.roomGameResult.id = bestCard.id;
    retMsg.roomGameResult.headCount = room.getHeadCount();
    retMsg.roomGameResult.likeCount = bestCard.like;
  }

  room.endGame();
  room.resetFinishCount();

  setTimeout(() => {
    retMsg = JSON.stringify(retMsg);

    users.forEach((user) => {
      socket.to(user.socketId).emit("gameAllFinish", retMsg);
    });
    socket.emit("gameAllFinish", retMsg);

    return retMsg;
  }, 1500);
};
