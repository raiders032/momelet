const SingleObject = require("../SingleObjects");

module.exports = (req, res, next, socket, io) => {
  const { id } = socket.handshake.query;
  console.log("id 타입: " + typeof id);
  if (SingleObject.UserRepository.existsById(id)) {
    // const user = SingleObject.UserRepository.findById(id);
    console.log("중복유저찾았다!");
    const user =
      io.sockets.connected[SingleObject.UserRepository.findById(id).socketId];
    user.disconnect(true);
  }
  SingleObject.UserRepository.add(socket.id, socket.handshake.query);
  console.log("a user connected. id: " + id);
  next();
};
