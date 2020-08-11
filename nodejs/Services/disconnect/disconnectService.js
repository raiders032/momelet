const SingleObject = require("../../SingleObjects");

const disconnectService = (socket) => {
  console.log("user disconnected");

  // 클래스의 프로퍼티에 직접 접근하고 있음
  SingleObject.UserRepository.delete(socket.id);

  const temp = Array.from(SingleObject.UserRepository.userRepository.values());
  const userId = [];
  temp.forEach((e) => userId.push(e["id"]));
  console.log("나간 후 유저리스트: " + userId);
};

module.exports = {
  disconnectService,
};
