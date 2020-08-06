const SingleObject = require("../SingleObjects");
const { togetherController } = require("./togetherController");
const { gameController } = require("./gameController");
const { disconnectController } = require("./disconnectController");

const frontController = () => {
  SingleObject.io.on("connection", (socket) => {
    // 중복 접속 체크. 지금은 결과만 출력하고 중복 접속을 막지 않음.
    let { id } = socket.handshake.query;
    console.log(SingleObject.UserList.checkUserAlreadyConnected(id));
    // 중복 체크 끝
    SingleObject.UserList.updateConnectedUser(
      socket.id,
      socket.handshake.query
    );

    console.log("a user connected");
    console.log(SingleObject.UserList.connectedUserList);
    console.log(SingleObject.UserList.connectedUserListForCheck);

    togetherController(socket);
    gameController(socket);
    disconnectController(socket);
  });
};

module.exports.frontController = frontController;
