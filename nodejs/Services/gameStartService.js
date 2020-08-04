const gameStartService = (socket, msg) => {
  var echo = "gameStart 이벤트. 받은 msg: " + msg;
  console.log(echo);

  return echo;
};

module.exports = {
  gameStartService,
};
