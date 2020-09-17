import * as SingleObject from "../../SingleObjects.js";
import SocketResponse from "../../SocketResponse.js";
import { ERR_NOT_ENOUGH_GAME_RESULT } from "../../Errors/GameError.js";
import gameAllFinishService from "./gameAllFinishService.js";
import logger from "../../logger.js";

export default (socket, { id, userGameResult, roomName }) => {
  let response = new SocketResponse();
  let data = {};
  let user, room;

  user = SingleObject.UserRepository.findById(id);
  room = SingleObject.RoomRepository.findByRoomName(roomName);

  if (user.canReceive === true) {
    room.addFinishCount();
    if (userGameResult.length === 7) {
      for (let result of userGameResult) {
        room.addScore(result.id, result.sign);
      }
    } else {
      throw new ERR_NOT_ENOUGH_GAME_RESULT();
    }
  }

  data.roomName = roomName;
  response.isOk(data);
  if (room.getHeadCount() <= room.getFinishCount()) {
    logger.info("gameAllFinish. roomName: " + roomName);
    gameAllFinishService(socket, room);
  }
  return response;
};
