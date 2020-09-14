import * as SingleObject from "../../SingleObjects.js";
import gameRoomUpdateService from "./gameRoomUpdateService.js";
import SocketResponse from "../../SocketResponse.js";
import { ERR_ROOM_NOT_EXIST } from "../../Errors/RepositoryError.js";

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

export default (socket, { id, roomName }) => {
  let response = new SocketResponse();
  let data = {};

  let room, user;
  room = SingleObject.RoomRepository.findByRoomName(roomName);
  user = SingleObject.UserRepository.findById(id);

  if (room === false) {
    throw new ERR_ROOM_NOT_EXIST();
  }
  // 기존 접속 방에서 나가기
  if (user.joinedRoomName !== null) {
    exitExistRoom(socket, user, id);
  }

  room.addUser(user);
  gameRoomUpdateService(socket, room, id);
  user.updateJoinedRoomName(roomName);

  data.roomName = roomName;
  data.gameRoomUserList = room.getUserInfo();
  data.hostId = room.getHostId();
  response.isOk(data);
  return response;
};
