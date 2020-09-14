import * as SingleObject from "../../SingleObjects.js";
import gameRoomUpdateService from "./gameRoomUpdateService.js";
import SocketResponse from "../../SocketResponse.js";

const exitRoom = (socket, user, room) => {
  if (room.deleteUser(user) > 0) {
    gameRoomUpdateService(socket, room, user.getId());
    return;
  }
  SingleObject.RoomRepository.delete(room.getRoomName());
};
export default (socket, { id, roomName }) => {
  let response = new SocketResponse();

  let user, room;
  user = SingleObject.UserRepository.findById(id);
  room = SingleObject.RoomRepository.findByRoomName(roomName);
  if (room !== false) {
    exitRoom(socket, user, room);
  }

  user.updateJoinedRoomName(null);
  response.isOk(null);
  return response;
};
