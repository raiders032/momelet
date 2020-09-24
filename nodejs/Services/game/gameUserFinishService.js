import * as SingleObject from "../../SingleObjects.js";
import SocketResponse from "../../SocketResponse.js";
import { ERR_NOT_ENOUGH_GAME_RESULT } from "../../Errors/GameError.js";
import gameAllFinishService from "./gameAllFinishService.js";
import logger from "../../logger.js";
import axios from "axios";

const sendUserLikingData = async (user, userGameResult, jwt) => {
  const userLikingDto = {
    userLongitude: user.longitude,
    userLatitude: user.latitude,
    userLiking: userGameResult,
  };

  try {
    await axios.post(
      process.env.SERVER_URL + `/api/v1/users/${user.id}/liking`,
      JSON.stringify(userLikingDto),
      {
        headers: {
          Authorization: "Bearer " + jwt,
          "Content-Type": "application/json",
        },
      }
    );
  } catch (err) {
    logger.error(err.stack);
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
        await sendUserLikingData(user, userGameResult, jwt);
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
