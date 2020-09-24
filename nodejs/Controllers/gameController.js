import { errorHandlerAsync } from "../Errors/errorHandler.js";
import {
  gameRoomJoinService,
  gameRoomLeaveService,
  gameStartService,
  gameUserFinishService,
  gameAllFinishService,
  gameRoomJoinAgainService,
} from "../Services/index.js";
import msgTypeCheck from "./util/msgTypeCheck.js";
import logger from "../logger.js";

export default (socket, errorHandler) => {
  // 게임방 입장
  socket.on("gameRoomJoin", (msg, ack) => {
    logger.info("gameRoomJoin. msg: " + msg);
    let response = errorHandler(() => {
      const { id, roomName } = JSON.parse(msg);
      msgTypeCheck({ number: [id], string: [roomName] });
      return gameRoomJoinService(socket, { id, roomName });
    });
    ack(JSON.stringify(response));
  });

  // 게임방 퇴장
  socket.on("gameRoomLeave", (msg, ack) => {
    logger.info("gameRoomLeave. msg: " + msg);
    let response = errorHandler(() => {
      const { id, roomName } = JSON.parse(msg);
      msgTypeCheck({ number: [id], string: [roomName] });
      return gameRoomLeaveService(socket, { id, roomName });
    });
    ack(JSON.stringify(response));
  });

  // 게임시작
  socket.on("gameStart", async (msg, ack) => {
    logger.info("gameStart. msg: " + msg);
    let response = await errorHandlerAsync(() => {
      const { id, roomName, radius, latitude, longitude, jwt } = JSON.parse(
        msg
      );
      msgTypeCheck({
        number: [id, radius, latitude, longitude],
        string: [roomName, jwt],
      });

      return gameStartService(socket, {
        id,
        roomName,
        radius,
        latitude,
        longitude,
        jwt,
      });
    });
    ack(JSON.stringify(response));
  });

  // 유저 한명 게임 종료
  socket.on("gameUserFinish", async (msg, ack) => {
    logger.info("gameRoomUserFinish. msg: " + msg);
    let response = await errorHandlerAsync(() => {
      const { id, userGameResult, roomName, jwt } = JSON.parse(msg);
      msgTypeCheck({
        number: [id],
        Array: [userGameResult],
        string: [roomName, jwt],
      });
      return gameUserFinishService(socket, {
        id,
        userGameResult,
        roomName,
        jwt,
      });
    });
    ack(JSON.stringify(response));
  });

  // 다시하기
  socket.on("gameRoomJoinAgain", (msg, ack) => {
    logger.info("gameRoomJoinAgain. msg: " + msg);
    let response = errorHandler(() => {
      const { id, roomName } = JSON.parse(msg);
      msgTypeCheck({ number: [id], string: [roomName] });
      return gameRoomJoinAgainService(socket, { id, roomName });
    });
    ack(JSON.stringify(response));
  });
};
