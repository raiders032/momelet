const singleObject = require("../singleObjects");
const ctr = require("../Controllers/index");

const frontController = () => {
  singleObject.io.on("connection", (socket) => {
    const { id, email, name, imageUrl, JWT } = socket.handshake.query;
    singleObject.userList.set(socket.id, { id, email, name, imageUrl, JWT });

    socket.join(socket.id + "_room");
    console.log("a user connected");
    console.log(singleObject.userList);

    // 같이하기;
    socket.on("together", (msg) => {
      const ret = ctr.togetherController(socket, msg);
      socket.emit("together", ret);
    });

    // 같이하기-초대하기
    socket.on("togetherInvite", (msg) => {
      const ret = ctr.togetherInviteController(socket, msg);
      socket.emit("togetherInvite", ret);
    });

    // 초대수락
    socket.on("togetherAccept", (msg) => {
      const ret = ctr.togetherAcceptController(socket, msg);
      socket.emit("togetherAccept", ret);
    });

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
