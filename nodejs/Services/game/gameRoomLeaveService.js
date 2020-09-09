import * as SingleObject from "../../SingleObjects.js";
import logger from "../../logger.js";
import gameRoomUpdateService from "./gameRoomUpdateService.js";
import SocketResponse from "../../socketResponse.js";

const exitRoom = (socket, user, room) => {
  if (room === false) return;
  if (room.deleteUser(user) > 0) {
    gameRoomUpdateService(socket, room, user.getId());
    return;
  }
  SingleObject.RoomRepository.delete(room.getRoomName());
};
export default (socket, msg) => {
  let response = new SocketResponse();
  let user, room;
  logger.info("gameRoomLeave. msg: " + msg);

  try {
    const { id, roomName } = JSON.parse(msg);
    user = SingleObject.UserRepository.findById(id);
    room = SingleObject.RoomRepository.findByRoomName(roomName);
    if (user.joinedRoomName !== null) {
      exitRoom(socket, user, room);
      user.updateJoinedRoomName(null);
      response.isOk({ id, roomName });
    } else {
      throw new Error("참여한 방이 없습니다.");
    }
  } catch (err) {
    logger.error("gameRoomLeaveService error: " + err);
    response.isFail("gameRoomLeaveService.error");
  }

  return JSON.stringify(response);
};
