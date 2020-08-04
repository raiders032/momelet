const gameRestartService = (socket, msg) => {
  var echo = "game-restart 이벤트. 받은 msg: " + msg;
  console.log(echo);
  socket.emit("game-restart", echo);
  return echo;
};

module.exports = {
  gameRestartService,
};
