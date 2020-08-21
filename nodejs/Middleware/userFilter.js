const SingleObject = require("../SingleObjects");

module.exports = (req, res, next, socket, io) => {
  socket.handshake.query.id = Number(socket.handshake.query.id);
  const { id } = socket.handshake.query;
  if (SingleObject.UserRepository.existsById(id)) {
    // const user = SingleObject.UserRepository.findById(id);
    console.log("중복유저찾았다!");
    const user =
      io.sockets.connected[SingleObject.UserRepository.findById(id).socketId];
    user.disconnect(true);
  }
  SingleObject.UserRepository.add(socket.id, socket.handshake.query);
  console.log(
    "유저 접속함. 현재 접속 유저 수: " +
      SingleObject.UserRepository.userRepository.size
  );
  next();
};
