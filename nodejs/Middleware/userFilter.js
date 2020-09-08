import * as SingleObject from "../SingleObjects.js";
import logger from "../logger.js";

export default (req, res, next, socket, io) => {
  socket.handshake.query.id = Number(socket.handshake.query.id);
  const { id } = socket.handshake.query;
  if (SingleObject.UserRepository.existsById(id)) {
    // const user = SingleObject.UserRepository.findById(id);
    logger.info("중복유저찾았다!");
    const user =
      io.sockets.connected[SingleObject.UserRepository.findById(id).socketId];
    user.disconnect(true);
  }
  SingleObject.UserRepository.add(socket.id, socket.handshake.query);

  const userList = SingleObject.UserRepository.findAll().map((user) => user.id);
  logger.info("a user connected. id: " + id + ", userList: (" + userList + ")");
  next();
};
