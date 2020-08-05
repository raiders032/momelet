const service = require("../Services/index");

const gameController = (socket) => {
  // 게임시작
  socket.on("gameStart", (msg) => {
    console.time("시작");
    const ret = service.gameStartService(socket, msg);
    socket.emit("gameStart", ret);
    console.timeEnd("시작");
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
