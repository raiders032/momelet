const service = require("../Services/index");

const gameController = (socket) => {
  // 게임방 입장
  socket.on("gameRoomJoin", (msg, fn) => {
    const ret = service.gameRoomJoinService(socket, msg);
    // socket.emit("gameRoomJoin", ret);
    fn(ret);
  });

  // 게임방 퇴장
  socket.on("gameRoomLeave", (msg, fn) => {
    const ret = service.gameRoomLeaveService(socket, msg);
    // socket.emit("gameRoomLeave", ret);
    fn(ret);
  });

  // 게임시작
  socket.on("gameStart", (msg) => {
    const ret = service.gameStartService(socket, msg);
    socket.emit("gameStart", ret);
  });

  // 유저 한명 게임 종료
  socket.on("gameUserFinish", (msg, fn) => {
    const ret = service.gameUserFinishService(socket, msg);
    // socket.emit("gameUserFinish", ret);
    fn(ret);
  });

  // 전체 유저 게임 종료
  socket.on("gameAllFinish", (msg, fn) => {
    const ret = service.gameAllFinishService(socket, msg);
    // socket.emit("gameAllFinish", ret);
    fn(ret);
  });

  // 다시하기
  socket.on("gameRestart", (msg, fn) => {
    const ret = service.gameRestartService(socket, msg);
    // socket.emit("gameRestart", ret);
    fn(ret);
  });
};

module.exports.gameController = gameController;
