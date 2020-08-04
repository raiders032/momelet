const togetherInviteService = (socket, msg) => {
  var echo = "together-invite 이벤트. 받은 msg: " + msg;
  console.log(echo);
  socket.emit("together-invite", echo);

  // 방이름 스트링으로 보내기
  var roomName = socket.id + " room";
  socket.join(roomName);
  socket.emit("together-invite", roomName);
  return echo;
};

module.exports = {
  togetherInviteService,
};