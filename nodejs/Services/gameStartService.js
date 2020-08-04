const gameStartService = (socket, msg) => {
  var echo = "game-start 이벤트. 받은 msg: " + msg;
  console.log(echo);
  socket.emit("game-start", echo);
  return echo;
};

module.exports = {
  gameStartService,
};
