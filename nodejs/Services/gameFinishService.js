const gameFinishService = (socket, msg) => {
  var echo = "game-finish 이벤트. 받은 msg: " + msg;
  console.log(echo);
  socket.emit("game-finish", echo);
  return echo;
};

module.exports = {
  gameFinishService,
};
