const SingleObject = require("../../SingleObjects");

const disconnectService = (socket) => {
  console.log("user disconnected");

  SingleObject.UserRepository.updateDisconnectedUser(socket.id);
  console.log("나간 후 유저리스트");

  // 클래스의 프로퍼티에 직접 접근하고 있음
  console.log(SingleObject.UserRepository.connectedUserRepository);
  console.log(SingleObject.UserRepository.connectedUserRepositoryForCheck);
};

module.exports = {
  disconnectService,
};
