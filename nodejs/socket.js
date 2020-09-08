import SocketIO from "socket.io";
import * as controller from "./Controllers/index.js";
// const { togetherController } = require("./Controllers/togetherController");
// const { gameController } = require("./Controllers/gameController");
// const { disconnectController } = require("./Controllers/disconnectController");
import userFilter from "./Middleware/userFilter.js";

export default (server, app) => {
  const io = SocketIO(server, {
    //path: "/momulet",
    serverClient: false, // 클라이언트 파일 제공 여부
    pingInterval: 20000, // 20초에 한 번씩 핑 보내기
    pingTimeout: 10000, // 10초 동안 퐁 기다리기
  });
  app.set("io", io);

  io.use((socket, next) => {
    userFilter(socket.request, socket.request.res, next, socket, io);
  });

  io.on("connection", (socket) => {
    controller.togetherController(socket);
    controller.gameController(socket);
    controller.disconnectController(socket);
  });
};
