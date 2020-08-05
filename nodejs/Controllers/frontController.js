const SingleObject = require("../SingleObjects");
const { togetherController } = require("./togetherController");
const { gameController } = require("./gameController");
const { disconnectController } = require("./disconnectController");

const frontController = () => {
  SingleObject.io.on("connection", (socket) => {
    const {
      id,
      email,
      name,
      imageUrl,
      JWT,
      latitude,
      longitude,
    } = socket.handshake.query;
    SingleObject.userList.set(socket.id, {
      id,
      email,
      name,
      imageUrl,
      JWT,
      latitude,
      longitude,
    });

    socket.join(socket.id + "_room");
    console.log("a user connected");
    console.log(SingleObject.userList);

    togetherController(socket);
    gameController(socket);
    disconnectController(socket);
  });
};

module.exports.frontController = frontController;
