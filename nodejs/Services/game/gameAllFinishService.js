const gameAllFinishService = (socket, msg) => {
  var echo = "gameAllFinish 이벤트. 받은 msg: " + msg;
  console.log(echo);

  return echo;
};

module.exports = {
  gameAllFinishService,
};
