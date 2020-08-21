const SingleObject = require("../../SingleObjects");
const { logger } = require("../../logger");

const disconnectService = (socket) => {
  console.log(
    "user disconnected " +
      SingleObject.UserRepository.findBySocketId(socket.id).id
  );
  logger.info(
    "user disconnected " +
      SingleObject.UserRepository.findBySocketId(socket.id).id
  );
  // 클래스의 프로퍼티에 직접 접근하고 있음
  SingleObject.UserRepository.delete(socket.id);

  const userList = SingleObject.UserRepository.findAll().map((user) => user.id);
  logger.info(
    "a user disconnected. id: " + socket.id + ", userList: (" + userList + ")"
  );
};

module.exports = {
  disconnectService,
};
