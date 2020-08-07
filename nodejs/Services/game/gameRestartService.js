const gameRestartService = (socket, msg) => {
  var echo = "gameRestart 이벤트. 받은 msg: " + msg;
  console.log(echo);

  return echo;
};

module.exports = {
  gameRestartService,
};
