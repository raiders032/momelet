const singleObject = require("../singleObjects");
const ctr = require("../Controllers/index");

const frontController = () => {
  singleObject.io.on("connection", (socket) => {
    singleObject.userList.set(socket.id, {
      socketId: socket.id,
      name: "jeong",
      latitude: 33.123,
      longitude: 127.123,
    });
    socket.join(socket.id + " room");
    console.log("a user connected");
    console.log(singleObject.userList);

    // 같이하기;
    socket.on("together", (msg) => {
      ctr.togetherController(socket, msg);
    });

    // 같이하기-초대하기
    socket.on("togetherInvite", (msg) => {
      ctr.togetherInviteController(socket, msg);
    });

    // 초대수락
    socket.on("togetherAccept", (msg) => {
      ctr.togetherAcceptController(socket, msg);
    });

    // 게임시작
    socket.on("gameStart", (msg) => {
      ctr.gameStartController(socket, msg);
    });

    // 게임종료
    socket.on("gameFinish", (msg) => {
      ctr.gameFinishController(socket, msg);
    });

    // 다시하기
    socket.on("gameRestart", (msg) => {
      ctr.gameRestartController(socket, msg);
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
