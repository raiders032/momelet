import * as SingleObject from "../../SingleObjects.js";
import SocketResponse from "../../socketResponse.js";
import { NotEnoughGameResultError } from "../../Errors/GameError.js";

export default ({ id, userGameResult, roomName }) => {
  let response = new SocketResponse();
  let data = {};
  let user, room;

  user = SingleObject.UserRepository.findById(id);
  room = SingleObject.RoomRepository.findByRoomName(roomName);

  if (user.canReceive === true) {
    room.addFinishCount();
    user.updateCanReceive(false);
    if (userGameResult.length === 7) {
      for (let result of userGameResult) {
        room.addScore(result.id, result.sign);
      }
    } else {
      throw new NotEnoughGameResultError();
    }
  }

  data.roomName = roomName;
  response.isOk(data);
  return response;
};
