const SingleObject = require("../../SingleObjects");
const { logger } = require("../../logger");

const disconnectService = (socket) => {
  // 클래스의 프로퍼티에 직접 접근하고 있음
  const { id } = SingleObject.UserRepository.findBySocketId(socket.id);
  SingleObject.UserRepository.delete(socket.id);

  const userList = SingleObject.UserRepository.findAll().map((user) => user.id);
  logger.info(
    "a user disconnected. id: " + id + ", userList: (" + userList + ")"
  );
};

module.exports = {
  disconnectService,
};
