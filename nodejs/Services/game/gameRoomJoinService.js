import * as SingleObject from "../../SingleObjects.js";
import logger from "../../logger.js";
import gameRoomUpdateService from "./gameRoomUpdateService.js";

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
  var echo = "gameRoomJoin. msg: " + msg;
  logger.info(echo);

  let retMsg = {
    status: "fail",
    roomName: null,
    gameRoomUserList: null,
    hostId: null,
  };
  let room, user;
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
    retMsg.status = "success";
    retMsg.roomName = roomName;
    retMsg.gameRoomUserList = room.getUserList();
    retMsg.hostId = room.getHostId();
  } catch (err) {
    logger.error("gameRoomJoinService error: " + err);
    retMsg.status = "fail";
    retMsg.roomName = null;
    retMsg.gameRoomUserList = null;
    retMsg.hostId = null;
  }

  retMsg = JSON.stringify(retMsg);
  return retMsg;
};
