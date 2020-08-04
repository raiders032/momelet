const service = require("../Services/index");

const gameController = (socket) => {
  // 게임시작
  socket.on("gameStart", (msg) => {
    const ret = service.gameStartService(socket, msg);
    socket.emit("gameStart", ret);
  });

  // 게임종료
  socket.on("gameFinish", (msg) => {
    const ret = service.gameFinishService(socket, msg);
    socket.emit("gameFinish", ret);
  });

  // 다시하기
  socket.on("gameRestart", (msg) => {
    const ret = service.gameRestartService(socket, msg);
    socket.emit("gameRestart", ret);
  });
};

module.exports.gameController = gameController;
