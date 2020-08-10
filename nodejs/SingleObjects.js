const app = require("express")();
const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  // path: "/momulet",
  serverClient: false, // 클라이언트 파일 제공 여부
  pingInterval: 20000, // 20초에 한 번씩 핑 보내기
  pingTimeout: 10000, // 10초 동안 퐁 기다리기
});
const request = require("request");
const ctr = require("./Controllers/index");
const { kMaxLength } = require("buffer");
// https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Map

// const userList = new Map();
const userRepositoryDomain = require("./Domains/UserRepository");
const UserRepository = new userRepositoryDomain.UserRepository();

const roomRepositoryDomain = require("./Domains/Roomrepository");
const RoomRepository = new roomRepositoryDomain.RoomRepository();

module.exports.app = app;
module.exports.server = server;
module.exports.io = io;
module.exports.UserRepository = UserRepository;
module.exports.RoomRepository = RoomRepository;
