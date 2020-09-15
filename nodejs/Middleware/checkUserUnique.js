import * as SingleObject from "../SingleObjects.js";
import logger from "../logger.js";

export default (io, socket, next) => {
  socket.handshake.query.id = parseInt(socket.handshake.query.id);
  const { id } = socket.handshake.query;
  // const { socketId } = SingleObject.UserRepository.findById(id);
  // console.log("소켓 아이디: " + socketId);
  console.log("구조 알아보기" + io.sockets);
  for (let i in io.sockets) {
    console.log(i);
    console.log(io.sockets[i]);
  }
  if (SingleObject.UserRepository.existById(id)) {
    // const user = SingleObject.UserRepository.findById(id);
    logger.info(id + " is overlapped user. Disconnect exsisting user");
    const user =
      io.sockets.connected[SingleObject.UserRepository.findById(id).socketId];
    if (user !== undefined) user.disconnect(true);
    SingleObject.UserRepository.delete(socketId);
  }
  SingleObject.UserRepository.add(socket.id, socket.handshake.query);

  const userList = SingleObject.UserRepository.findAll().map((user) => user.id);
  logger.info("a user connected. id: " + id + ", userList: (" + userList + ")");
  next();
};
