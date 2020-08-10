const SocketIO = require("socket.io");
const SingleObject = require("./SingleObjects");
const { togetherController } = require("./Controllers/togetherController");
const { gameController } = require("./Controllers/gameController");
const { disconnectController } = require("./Controllers/disconnectController");

const addUserMiddleware = (req, res, next, socket) => {
  // const { id } = socket.handshake.query;
  // const user = SingleObject.UserRepository.findById(id);
  // user.socketId;
  console.log(socket["nsp"]);
  SingleObject.UserRepository.add(socket.id, socket.handshake.query);
  // console.log("a user connected");
  // console.log(SingleObject.UserRepository.userRepository);
  next();
};
module.exports = (server, app) => {
  const io = SocketIO(server, {
    //path: "/momulet",
    serverClient: false, // 클라이언트 파일 제공 여부
    pingInterval: 20000, // 20초에 한 번씩 핑 보내기
    pingTimeout: 10000, // 10초 동안 퐁 기다리기
  });
  app.set("io", io);

  io.use((socket, next) => {
    addUserMiddleware(socket.request, socket.request.res, next, socket);
  });

  io.on("connection", (socket) => {
    togetherController(socket);
    gameController(socket);
    disconnectController(socket);
  });
};
