import * as SingleObject from "../../SingleObjects.js";
import logger from "../../logger.js";
import gameRoomUpdateService from "./gameRoomUpdateService.js";

const exitRoom = (socket, user, room) => {
  if (room === false) return;
  if (room.deleteUser(user) > 0) {
    gameRoomUpdateService(socket, room, user.getId());
    return;
  }
  SingleObject.RoomRepository.delete(room.getRoomName());
};
export default (socket, msg) => {
  var echo = "gameRoomLeave. msg: " + msg;
  logger.info(echo);

  let retMsg = { status: "fail" };
  let user, room;

  try {
    const { id, roomName } = JSON.parse(msg);
    user = SingleObject.UserRepository.findById(id);
    room = SingleObject.RoomRepository.findByRoomName(roomName);
    if (user.joinedRoomName !== null) {
      exitRoom(socket, user, room);
      user.updateJoinedRoomName(null);
      retMsg.status = "ok";
    }
  } catch (err) {
    logger.error("gameRoomLeaveService error: " + err);
    retMsg.status = "fail";
  }

  retMsg = JSON.stringify(retMsg);
  return retMsg;
};
