const SingleObject = require("../SingleObjects");
const { togetherController } = require("./togetherController");
const { gameController } = require("./gameController");
const { disconnectController } = require("./disconnectController");

const frontController = () => {
  SingleObject.io.on("connection", (socket) => {
    // const {
    //   id,
    //   email,
    //   name,
    //   imageUrl,
    //   JWT,
    //   latitude,
    //   longitude,
    // } = socket.handshake.query;
    // SingleObject.userList.set(socket.id, {
    //   id,
    //   email,
    //   name,
    //   imageUrl,
    //   JWT,
    //   latitude,
    //   longitude,
    // });
    SingleObject.Users.addConnectedUser(socket.id, socket.handshake.query);
    socket.join(socket.id + "_room");
    console.log("a user connected");
    console.log(SingleObject.Users.connectedUsers);
    console.log(SingleObject.Users.connectedUsersForCheck);

    togetherController(socket);
    gameController(socket);
    disconnectController(socket);
  });

  SingleObject.io.on("together", (socket) => {
    console.log("메시지 받기 성공");
  });
};

module.exports.frontController = frontController;
