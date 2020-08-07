const gameUserFinishService = (socket, msg) => {
  var echo = "gameRoomUserFinish 이벤트. 받은 msg: " + msg;
  console.log(echo);

  return echo;
};

module.exports = {
  gameUserFinishService,
};
