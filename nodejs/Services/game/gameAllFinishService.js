import SocketResponse from "../../SocketResponse.js";

export default (socket, room) => {
  let response = new SocketResponse();
  let data = { roomGameResult: {} };

  const users = room.getUserList();
  const cardList = room.getCardList();
  let bestCard = { id: null, like: 0, score: 0 };
  let isLike = false;

  cardList.forEach((card, key) => {
    if (card.score > bestCard.score) {
      bestCard.score = card.score;
      bestCard.like = card.like;
      bestCard.id = key;
    }
    if (card.like > 0) isLike = true;
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

  setTimeout(() => {
    let retMsg = JSON.stringify(response);

    socket.emit("gameAllFinish", retMsg);
    users.forEach((user) => {
      socket.to(user.socket.id).emit("gameAllFinish", retMsg);
    });
  }, 1500);
};
