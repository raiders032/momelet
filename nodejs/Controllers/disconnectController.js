const { disconnectService } = require("../Services/index");

const disconnectController = (socket) => {
  // 모든 방에서 나가는 로직 추가 필요
  //
  return disconnectService(socket);
};

module.exports = {
  disconnectController,
};
