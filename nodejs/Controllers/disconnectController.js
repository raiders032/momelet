const service = require("../Services/index");

const disconnectController = (socket) => {
  // 연결이 끊어지려 하지만 방은 아직 안나감
  socket.on("disconnecting", (reason) => {
    service.disconnectingService(socket, reason);
  });

  // 연결 해제
  socket.on("disconnect", () => {
    service.disconnectService(socket);
  });
};

module.exports.disconnectController = disconnectController;
