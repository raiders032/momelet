const SingleObject = require("../SingleObjects");
const ctr = require("../Controllers/index");
const { togetherController } = require("./togetherController");

const frontController = () => {
  SingleObject.io.on("connection", (socket) => {
    const { id, email, name, imageUrl, JWT } = socket.handshake.query;
    SingleObject.userList.set(socket.id, { id, email, name, imageUrl, JWT });

    socket.join(socket.id + "_room");
    console.log("a user connected");
    console.log(SingleObject.userList);

    togetherController(socket);

    // 게임시작
    socket.on("gameStart", (msg) => {
      const ret = ctr.gameStartController(socket, msg);
      socket.emit("gameStart", ret);
    });

    // 게임종료
    socket.on("gameFinish", (msg) => {
      const ret = ctr.gameFinishController(socket, msg);
      socket.emit("gameFinish", ret);
    });

    // 다시하기
    socket.on("gameRestart", (msg) => {
      const ret = ctr.gameRestartController(socket, msg);
      socket.emit("gameRestart", ret);
    });

    // 연결이 끊어지려 하지만 방은 아직 안나감
    socket.on("disconnecting", (reason) => {
      ctr.disconnectingController(socket, reason);
    });

    // 연결 해제
    socket.on("disconnect", () => {
      ctr.disconnectController(socket);
    });
  });
};

module.exports = {
  frontController,
};
