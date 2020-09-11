import {
  gameRoomJoinService,
  gameRoomLeaveService,
  gameStartService,
  gameUserFinishService,
  gameAllFinishService,
  gameRoomJoinAgainService,
} from "../Services/index.js";
import msgTypeCheck from "./msgTypeCheck.js";

export default (socket) => {
  // 게임방 입장
  socket.on("gameRoomJoin", (msg, ack) => {
    const ret = gameRoomJoinService(socket, msg);
    ack(ret);
  });

  // 게임방 퇴장
  socket.on("gameRoomLeave", (msg, ack) => {
    const ret = gameRoomLeaveService(socket, msg);
    ack(ret);
  });

  // 게임시작
  socket.on("gameStart", async (msg, ack) => {
    const ret = await gameStartService(socket, msg);
    ack(ret);
  });

  // 유저 한명 게임 종료
  socket.on("gameUserFinish", (msg, ack) => {
    const ret = gameUserFinishService(socket, msg);
    ack(ret);
    gameAllFinishService(socket, msg);
  });

  // 전체 유저 게임 종료
  socket.on("gameAllFinish", (msg, ack) => {
    const ret = gameAllFinishService(socket, msg);
    ack(ret);
  });

  // 다시하기
  socket.on("gameRoomJoinAgain", (msg, ack) => {
    const ret = gameRoomJoinAgainService(socket, msg);
    ack(ret);
  });
};
