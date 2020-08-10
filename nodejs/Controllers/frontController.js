const SingleObject = require("../SingleObjects");
const { togetherController } = require("./togetherController");
const { gameController } = require("./gameController");
const { disconnectController } = require("./disconnectController");

const frontController = () => {
  SingleObject.io.on("connection", (socket) => {
    SingleObject.UserRepository.add(socket.id, socket.handshake.query);

    console.log("a user connected");
    console.log(SingleObject.UserRepository.userRepository);

    togetherController(socket);
    gameController(socket);
    disconnectController(socket);
  });
};

module.exports.frontController = frontController;
