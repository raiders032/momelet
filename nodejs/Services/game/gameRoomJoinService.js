import * as SingleObject from "../../SingleObjects.js";
import SocketResponse from "../../SocketResponse.js";
import roomLeave from "../util/roomLeave.js";
import logger from "../../logger.js";

export default (socket, { id, roomName }) => {
  let response = new SocketResponse();
  let data = {};

  let room, user;
  room = SingleObject.RoomRepository.findByRoomName(roomName);
  user = SingleObject.UserRepository.findById(id);

  // 기존 접속 방에서 나가기
  try {
    if (user.joinedRoomName !== null) {
      roomLeave(
        user,
        SingleObject.RoomRepository.findByRoomName(user.joinedRoomName)
      );
    }
  } catch (err) {
    logger.error(err.stack);
  }

  room.addUser(user);

  data.roomName = roomName;
  data.gameRoomUserList = room.getUserInfo();
  data.hostId = room.getHostId();

  response.isOk(data);
  return response;
};
