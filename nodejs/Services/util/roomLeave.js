import { RoomRepository } from "../../SingleObjects.js";
import gameRoomUpdateService from "../game/gameRoomUpdateService.js";
import { ERR_ROOM_NOT_FOUND } from "../../Errors/RepositoryError.js";

export default (user, room) => {
  if (room === false) {
    throw new ERR_ROOM_NOT_FOUND();
  }
  user.socket.leave(room.getRoomName());
  user.updateJoinedRoomName(null);
  if (room.deleteUser(user) > 0) {
    gameRoomUpdateService(user.socket, room);
  } else {
    RoomRepository.delete(room.getRoomName());
  }
};
