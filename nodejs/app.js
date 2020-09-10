import express from "express";
import logger from "./logger.js";
import SocketIO from "socket.io";
import dotenv from "dotenv";
import socketioJwt from "socketio-jwt";
import * as controller from "./Controllers/index.js";
import userFilter from "./Middleware/userFilter.js";
dotenv.config();

const app = express();
const server = app.listen(process.env.PORT, () => {
  logger.info("Server started. listening on *:3000.");
});
const io = SocketIO(server, {
  //path: "/momulet",
  serverClient: false, // 클라이언트 파일 제공 여부
  pingInterval: 20000, // 20초에 한 번씩 핑 보내기
  pingTimeout: 10000, // 10초 동안 퐁 기다리기
});

io.use((socket, next) => {
  userFilter(io, socket, next);
});

io.sockets
  .on(
    "connection",
    socketioJwt.authorize({
      secret: process.env.SECRET_KEY,
      timeout: 15000,
    })
  )
  .on("authenticated", (socket) => {
    controller.togetherController(socket);
    controller.gameController(socket);
    controller.disconnectController(socket);
  });

io.on("together", (socket) => {
  console.log("wow");
});
app.set("server", server);
app.set("io", io);
export default app;
/^\/\w+$/;
