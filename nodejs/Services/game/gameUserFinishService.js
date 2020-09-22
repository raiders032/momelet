import * as SingleObject from "../../SingleObjects.js";
import SocketResponse from "../../SocketResponse.js";
import { ERR_NOT_ENOUGH_GAME_RESULT } from "../../Errors/GameError.js";
import gameAllFinishService from "./gameAllFinishService.js";
import logger from "../../logger.js";
import axios from "axios";

const sendUserLikingData = async (user, userGameResult, jwt) => {
  const userLikingDto = [];
  userGameResult.forEach((result) => {
    const dto = {
      elapsedTime: result.elapsedTime,
      restaurantId: result.id,
      userLatitude: user.latitude,
      userLongitude: user.longitude,
      liking: (() => {
        if (user.sign === "y") return "LIKE";
        else if (user.sign === "n") return "DISLIKE";
        else if (user.sign === "s") return "SOSO";
        else return "y";
      })(),
    };
    return dto;
  });
  try {
    await axios.post(
      process.env.SERVER_URL + `/api/v1/users/${user.id}/liking`,
      JSON.stringify(userLikingDto),
      { headers: "Bearer " + jwt }
    );
  } catch (err) {
    let errObj = new Error();
    if (err.response) {
      errObj.message = err.response.data.message;
      errObj.errorCode = err.response.data.errorCode;
    } else {
      errObj.message = "Can't connect Spring Server. /api/v1/users/{id}/liking";
      errObj.errorCode = 999;
    }

    logger.error(errObj);
  }
};

export default async (socket, { id, userGameResult, roomName, jwt }) => {
  let response = new SocketResponse();
  let data = {};
  let user, room;

  user = SingleObject.UserRepository.findById(id);
  room = SingleObject.RoomRepository.findByRoomName(roomName);

  if (user.canReceive === true) {
    room.addFinishCount();
    if (userGameResult.length === 7) {
      for (let result of userGameResult) {
        room.addScore(result.id, result.sign, jwt);
      }
      try {
        sendUserLikingData(user, userGameResult);
      } catch (err) {
        // continue
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
