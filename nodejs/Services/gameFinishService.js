const gameFinishService = (socket, msg) => {
  var echo = "gameFinish 이벤트. 받은 msg: " + msg;
  console.log(echo);

  return echo;
};

module.exports = {
  gameFinishService,
};
