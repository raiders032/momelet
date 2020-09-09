import * as SingleObject from "../../SingleObjects.js";
import logger from "../../logger.js";
import gameRoomUpdateService from "./gameRoomUpdateService.js";
import SocketResponse from "../../socketResponse.js";

const exitExistRoom = (socket, user, id) => {
  const room = SingleObject.RoomRepository.findByRoomName(user.joinedRoomName);
  if (room === false) {
    user.updateJoinedRoomName(null);
    return;
  }
  if (room.deleteUser(user) === 0) {
    SingleObject.RoomRepository.delete(room.getRoomName());
    return;
  }
  gameRoomUpdateService(socket, room, id);
};

export default (socket, msg) => {
  let response = new SocketResponse();
  let data;
  let room, user;
  var echo = "gameRoomJoin. msg: " + msg;

  logger.info(echo);

  try {
    const { id, roomName } = JSON.parse(msg);
    room = SingleObject.RoomRepository.findByRoomName(roomName);
    user = SingleObject.UserRepository.findById(id);

    // 기존 접속 방에서 나가기
    if (user.joinedRoomName !== null) {
      exitExistRoom(socket, user, id);
    }

    room.addUser(user);
    gameRoomUpdateService(socket, room, id);
    user.updateJoinedRoomName(roomName);
    data.roomName = roomName;
    data.gameRoomUserList = room.getUserList();
    data.hostId = room.getHostId();
    response.isOk(data);
  } catch (err) {
    logger.error("gameRoomJoinService error: " + err);
    response.isFail("gameRoomJoinService.error");
  }

  return JSON.stringify(response);
};
