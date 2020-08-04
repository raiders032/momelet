const togetherAcceptService = (socket, msg) => {
  var echo = "togetherAccept 이벤트. 받은 msg: " + msg;
  console.log(echo);
  socket.emit("togetherAccept", echo);
  return echo;
};

module.exports = {
  togetherAcceptService,
};
