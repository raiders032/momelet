const gameUserFinishService = (socket, msg) => {
  var echo = "gameRoomUserFinish 이벤트. 받은 msg: " + msg;
  console.log(echo);

  let retMsg = {
    status: "fail",
  };

  const { id, userGameResult } = JSON.parse(msg);

  retMsg = JSON.stringify(retMsg);
  return retMsg;
};

module.exports = {
  gameUserFinishService,
};
