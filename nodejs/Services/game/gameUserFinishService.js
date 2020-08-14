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
  // const user = SingleObject.

  if (room.getHeadCount() <= room.getFinishCount()) {
    gameAllFinishService(socket, "게임 다 끝났음");
  }
  retMsg = JSON.stringify(retMsg);
  return retMsg;
};

module.exports = {
  gameUserFinishService,
};
