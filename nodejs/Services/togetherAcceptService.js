const togetherAcceptService = (socket, msg) => {
  var echo = "together-accept 이벤트. 받은 msg: " + msg;
  console.log(echo);
  socket.emit("together-accept", echo);
  return echo;
};

module.exports = {
  togetherAcceptService,
};
