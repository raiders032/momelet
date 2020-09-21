import * as SingleObject from "../SingleObjects.js";
import logger from "../logger.js";

export default (io, socket, next) => {
  socket.handshake.query.id = parseInt(socket.handshake.query.id);
  const { id } = socket.handshake.query;

  if (SingleObject.UserRepository.existById(id)) {
    // const user = SingleObject.UserRepository.findById(id);
    logger.info(id + " is overlapped user. Disconnect exsisting user");
    const user = SingleObject.UserRepository.findById(id);

    if (user !== undefined) user.socket.disconnect(true);
  }
  SingleObject.UserRepository.add(socket, socket.handshake.query);

  const userList = SingleObject.UserRepository.findAll().map((user) => user.id);
  logger.info("a user connected. id: " + id + ", userList: (" + userList + ")");
  next();
};
