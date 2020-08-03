const app = require("./app.js");
const { findUserLocation } = require("./Domains/findUserLocation.js");
// 같이하기
const togetherService = (socket, msg) => {
  var echo = "together 이벤트. 받은 msg: " + msg;
  console.log(echo);
  socket.emit("together", echo);
  return echo;
};

// 같이하기-초대하기
const togetherInviteService = (socket, msg) => {
  var echo = "together-invite 이벤트. 받은 msg: " + msg;
  console.log(echo);
  socket.emit("together-invite", echo);

  // 방이름 스트링으로 보내기
  var roomName = socket.id + " room";
  socket.join(roomName);
  socket.emit("together-invite", roomName);
  return echo;
};

// 초대수락
const togetherAcceptService = (socket, msg) => {
  var echo = "together-accept 이벤트. 받은 msg: " + msg;
  console.log(echo);
  socket.emit("together-accept", echo);
  return echo;
};

// 게임시작
const gameStartService = (socket, msg) => {
  var echo = "game-start 이벤트. 받은 msg: " + msg;
  console.log(echo);
  socket.emit("game-start", echo);
  return echo;
};

// 게임종료
const gameFinishService = (socket, msg) => {
  var echo = "game-finish 이벤트. 받은 msg: " + msg;
  console.log(echo);
  socket.emit("game-finish", echo);
  return echo;
};

// 다시하기
const gameRestartService = (socket, msg) => {
  var echo = "game-restart 이벤트. 받은 msg: " + msg;
  console.log(echo);
  socket.emit("game-restart", echo);
  return echo;
};

// 연결 끊어지는 중
const disconnectingService = (socket, reason) => {
  var rooms = Object.keys(socket.rooms);
  console.log(socket.id + "가 연결이 끊어지기 전에 접속하고 있는 방 목록");
  console.log(rooms);
  return true;
};
// 연결 해제
const disconnectService = (socket) => {
  console.log("user disconnected");

  // return true or false
  app.userList.delete(socket.id);
};

module.exports = {
  togetherService,
  togetherInviteService,
  togetherAcceptService,
  gameStartService,
  gameFinishService,
  gameRestartService,
  disconnectingService,
  disconnectService,
};
