const service = require("../Services/index");

const gameController = (socket) => {
  // 게임방 입장
  socket.on("gameRoomJoin", (msg) => {
    const ret = service.gameRoomJoinService(socket, msg);
    socket.emit("gameRoomJoin", ret);
  });

  // 게임방 유저 목록 업데이트
  socket.on("gameRoomUpdate", (msg) => {
    const ret = service.gameRoomUpdateService(socket, msg);
    socket.emit("gameRoomUpdate", ret);
  });

  // 게임방 퇴장
  socket.on("gameRoomLeave", (msg) => {
    const ret = service.gameRoomLeaveService(socket, msg);
    socket.emit("gameRoomLeave", ret);
  });

  // 게임시작
  socket.on("gameStart", (msg) => {
    const ret = service.gameStartService(socket, msg);
    socket.emit("gameStart", ret);
  });

  // 유저 한명 게임 종료
  socket.on("gameUserFinish", (msg) => {
    const ret = service.gameUserFinishService(socket, msg);
    socket.emit("gameUserFinish", ret);
  });

  // 전체 유저 게임 종료
  socket.on("gameAllFinish", (msg) => {
    const ret = service.gameAllFinishService(socket, msg);
    socket.emit("gameAllFinish", ret);
  });

  // 다시하기
  socket.on("gameRestart", (msg) => {
    const ret = service.gameRestartService(socket, msg);
    socket.emit("gameRestart", ret);
  });
};

module.exports.gameController = gameController;
