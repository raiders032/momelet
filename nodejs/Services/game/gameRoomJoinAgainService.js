import * as SingleObject from "../../SingleObjects.js";
import logger from "../../logger.js";
import gameRoomUpdateService from "./gameRoomUpdateService.js";
import SocketResponse from "../../socketResponse.js";

export default (socket, msg) => {
  let response = new SocketResponse();
  let data = {};
  let id, roomName;
  var echo = "gameRoomJoinAgain. msg: " + msg;
  logger.info(echo);

  try {
    const parsedMsg = JSON.parse(msg);
    id = parsedMsg.id;
    roomName = parsedMsg.roomName;
  } catch (err) {
    response.isFail("json.parse");
    logger.error("gameRoomJoinAgain Msg parse error: " + err);

    return JSON.stringify(response);
  }

  const room = SingleObject.RoomRepository.findByRoomName(roomName);
  if (
    room !== false &&
    room.getIsStarted() === false &&
    room.findUserById(id)
  ) {
    const user = SingleObject.UserRepository.findById(id);
    user.updateCanReceive(true);
    data.gameRoomUserList = room
      .getUserList()
      .filter((user) => user.getCanReceive())
      .map((user) => {
        const { id, name, imageUrl } = user;
        return { id, name, imageUrl };
      });

    // change host
    if (
      SingleObject.UserRepository.findById(room.getHostId()).getCanReceive() ===
      false
    ) {
      room.updateHostId(user.getId());
    }

    data.hostId = room.getHostId();
    response.isOk(data);
    gameRoomUpdateService(socket, room, id);
  } else {
    response.isFail("game.join.again");
  }

  return JSON.stringify(response);
};
