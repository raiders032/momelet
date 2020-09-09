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

// webSocket(server, app);

const io = SocketIO(server, {
  //path: "/momulet",
  serverClient: false, // 클라이언트 파일 제공 여부
  pingInterval: 20000, // 20초에 한 번씩 핑 보내기
  pingTimeout: 10000, // 10초 동안 퐁 기다리기
});

io.use(
  socketioJwt.authorize({
    secret: "secret key",
    handshake: true,
    auth_header_required: true,
  })
);
io.use((socket, next) => {
  userFilter(io, socket, next);
});

io.on("connection", (socket) => {
  controller.togetherController(socket);
  controller.gameController(socket);
  controller.disconnectController(socket);
});

app.set("server", server);
app.set("io", io);
export default app;
