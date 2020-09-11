import SocketResponse from "../SocketResponse.js";
import { errorCheckAsync } from "../Controllers/errorCheckController.js";
import {
  gameRoomJoinService,
  gameRoomLeaveService,
  gameStartService,
  gameUserFinishService,
  gameAllFinishService,
  gameRoomJoinAgainService,
} from "../Services/index.js";
import msgTypeCheck from "./msgTypeCheck.js";
import logger from "../logger.js";

export default (socket, errorCheck) => {
  // 게임방 입장
  socket.on("gameRoomJoin", (msg, ack) => {
    logger.info("gameRoomJoin. msg: " + msg);
    let response = errorCheck(() => {
      const { id, roomName } = JSON.parse(msg);
      msgTypeCheck({ number: [id], string: [roomName] });
      return gameRoomJoinService(socket, { id, roomName });
    });
    ack(JSON.stringify(response));
  });

  // 게임방 퇴장
  socket.on("gameRoomLeave", (msg, ack) => {
    logger.info("gameRoomLeave. msg: " + msg);
    let response = errorCheck(() => {
      const { id, roomName } = JSON.parse(msg);
      msgTypeCheck({ number: [id], string: [roomName] });
      return gameRoomLeaveService(socket, { id, roomName });
    });
    ack(JSON.stringify(response));
  });

  // 게임시작
  socket.on("gameStart", async (msg, ack) => {
    logger.info("gameStart. msg: " + msg);
    let response = await errorCheckAsync(async () => {
      const { id, roomName, radius, latitude, longitude } = JSON.parse(msg);
      msgTypeCheck({
        number: [id, radius, latitude, longitude],
        string: [roomName],
      });

      return await gameStartService(socket, {
        id,
        roomName,
        radius,
        latitude,
        longitude,
      });
    });
    ack(JSON.stringify(response));
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
