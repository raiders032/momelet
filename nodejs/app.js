const app = require("express")();
const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  // path: "/momulet",
  serverClient: false, // 클라이언트 파일 제공 여부
  pingInterval: 20000, // 20초에 한 번씩 핑 보내기
  pingTimeout: 10000, // 10초 동안 퐁 기다리기
});
module.exports.io = io;

const request = require("request");
const ctr = require("./eventController");

// https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Map
const userList = new Map();
module.exports.userList = userList;

// 디버깅 용
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
  userList.set(socket.id, {
    socketId: socket.id,
    name: "jeong",
    latitude: 33.123,
    longitude: 127.123,
  });
  socket.join(socket.id + " room");
  console.log("a user connected");
  console.log(userList);

  // 같이하기
  socket.on("together", (msg) => {
    ctr.togetherController(socket, msg);
  });

  // 같이하기-초대하기
  socket.on("together-invite", (msg) => {
    ctr.togetherInviteController(socket, msg);
  });
  // 초대수락
  socket.on("together-accept", (msg) => {
    ctr.togetherAcceptController(socket, msg);
  });
  // 게임시작
  socket.on("game-start", (msg) => {
    ctr.gameStartController(socket, msg);
  });
  // 게임종료
  socket.on("game-finish", (msg) => {
    ctr.gameFinishController(socket, msg);
  });
  // 다시하기
  socket.on("game-restart", (msg) => {
    ctr.gameRestartController(socket, msg);
  });

  // 연결이 끊어지려 하지만 방은 아직 안나감
  socket.on("disconnecting", (reason) => {
    ctr.disconnectingController(socket, reason);
  });
  // 연결 해제
  socket.on("disconnect", () => {
    ctr.disconnectController(socket);
  });
});

server.listen(3000, () => {
  console.log("listening on *:3000");
});
