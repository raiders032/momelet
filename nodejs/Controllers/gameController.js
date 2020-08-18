const service = require("../Services/index");

const gameController = (socket) => {
  // 게임방 입장
  socket.on("gameRoomJoin", (msg, ack) => {
    const ret = service.gameRoomJoinService(socket, msg);
    // socket.emit("gameRoomJoin", ret);
    ack(ret);
  });

  // 게임방 퇴장
  socket.on("gameRoomLeave", (msg, ack) => {
    const ret = service.gameRoomLeaveService(socket, msg);
    // socket.emit("gameRoomLeave", ret);
    ack(ret);
  });

  // 게임시작
  socket.on("gameStart", async (msg, ack) => {
    const ret = await service.gameStartService(socket, msg);
    // socket.emit("gameStart", ret);
    ack(ret);
  });

  // 유저 한명 게임 종료
  socket.on("gameUserFinish", (msg, ack) => {
    const ret = service.gameUserFinishService(socket, msg);
    // socket.emit("gameUserFinish", ret);
    ack(ret);
    service.gameAllFinishService(socket, msg);
  });

  // 전체 유저 게임 종료
  socket.on("gameAllFinish", (msg, ack) => {
    const ret = service.gameAllFinishService(socket, msg);
    // socket.emit("gameAllFinish", ret);
    ack(ret);
  });

  // 다시하기
  socket.on("gameRoomJoinAgain", (msg, ack) => {
    const ret = service.gameRoomJoinAgainService(socket, msg);
    // socket.emit("gameRestart", ret);
    ack(ret);
  });
};

module.exports.gameController = gameController;
