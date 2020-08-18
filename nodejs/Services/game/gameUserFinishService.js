const SingleObject = require("../../SingleObjects");
const { gameAllFinishService } = require("./gameAllFinishService");
const gameUserFinishService = (socket, msg) => {
  var echo = "gameRoomUserFinish 이벤트. 받은 msg: " + msg;
  console.log(echo);

  let retMsg = {
    status: "fail",
  };

  const { id, userGameResult, roomName } = JSON.parse(msg);
  const room = SingleObject.RoomRepository.findByRoomName(roomName);
  if (userGameResult.length === 7) {
    for (let result of userGameResult) {
      room.addScore(result.id, result.sign);
    }
  } else {
    console.log("유저 게임이 제대로 종료되지 않아 결과가 반영되지 않았음");
  }
  retMsg.status = "wait";
  room.addFinishCount();

  retMsg = JSON.stringify(retMsg);
  return retMsg;
};

module.exports = {
  gameUserFinishService,
};
