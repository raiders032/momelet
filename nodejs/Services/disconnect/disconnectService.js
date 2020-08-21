const SingleObject = require("../../SingleObjects");

const disconnectService = (socket) => {
  console.log(
    "user disconnected " +
      SingleObject.UserRepository.findBySocketId(socket.id).id
  );

  // 클래스의 프로퍼티에 직접 접근하고 있음
  SingleObject.UserRepository.delete(socket.id);

  const userId = SingleObject.UserRepository.findAll().map((user) => user.id);
  console.log(
    "유저 나감. 나간 후 유저수: " +
      SingleObject.UserRepository.userRepository.size
  );
};

module.exports = {
  disconnectService,
};
