const SingleObject = require("../../SingleObjects");

const disconnectService = (socket) => {
  console.log("user disconnected");

  // 클래스의 프로퍼티에 직접 접근하고 있음
  SingleObject.UserRepository.delete(socket.id);
  console.log("나간 후 유저리스트");
  console.log(SingleObject.UserRepository.userRepository);
};

module.exports = {
  disconnectService,
};
