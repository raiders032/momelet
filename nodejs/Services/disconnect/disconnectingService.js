const disconnectingService = (socket, reason) => {
  var rooms = Object.keys(socket.rooms);
  console.log(socket.id + "가 연결이 끊어지기 전에 접속하고 있는 방 목록");
  console.log(rooms);
  return true;
};

module.exports = {
  disconnectingService,
};
