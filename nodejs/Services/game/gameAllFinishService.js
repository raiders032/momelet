import SocketResponse from "../../SocketResponse.js";
import app from "../../app.js";

export default (socket, room) => {
  let response = new SocketResponse();
  let data = { roomGameResult: {} };

  const cardList = room.getCardList();
  let bestCard = { id: null, like: 0, score: 0 };
  let isLike = false;

  cardList.forEach((card, key) => {
    if (card.score > bestCard.score) {
      bestCard.score = card.score;
      bestCard.like = card.liking;
      bestCard.id = key;
    }
    if (card.liking > 0) isLike = true;
  });

  if (!isLike) {
    response.isFail(320);
  } else {
    data.roomGameResult.id = bestCard.id;
    data.roomGameResult.headCount = room.getHeadCount();
    data.roomGameResult.likeCount = bestCard.like;
    response.isOk(data);
  }

  room.endGame();
  room.resetFinishCount();

  const users = room.getUserList();
  setTimeout(() => {
    let retMsg = JSON.stringify(response);

    app.get("io").of("/").to(room.getRoomName()).emit("gameAllFinish", retMsg);
    users.forEach((user) => {
      user.socket.leave(room.getRoomName());
      user.updateCanReceive(false);
    });
  }, 1500);
};
