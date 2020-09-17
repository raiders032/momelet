import express from "express";
import SocketIO from "socket.io";
import socketioJwt from "socketio-jwt";
import { errorHandler } from "./Errors/errorHandler.js";
import checkUserUnique from "./Middleware/checkUserUnique.js";
import togetherController from "./Controllers/togetherController.js";
import gameController from "./Controllers/gameController.js";
import disconnectController from "./Controllers/disconnectController.js";
import logger from "./logger.js";
import dotenv from "dotenv";
import prometheus from "socket.io-prometheus-metrics";
dotenv.config();

function controller(socket) {
  togetherController(socket, errorHandler);
  gameController(socket, errorHandler);
  disconnectController(socket, errorHandler);
}

function startServer() {
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
  prometheus.metrics(io, {
    port: 3001,
  });

  io.use((socket, next) => {
    checkUserUnique(io, socket, next);
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
      controller(socket);
    });

  app.set("server", server);
  return app;
}

const app = startServer();

export default app;
