import { RoomRepository } from "../../SingleObjects.js";
import gameRoomUpdateService from "../game/gameRoomUpdateService.js";

export default (user, room) => {
  user.socket.leave(room.getRoomName());
  user.updateJoinedRoomName(null);
  if (room.deleteUser(user) > 0) {
    gameRoomUpdateService(user.socket, room, user.id);
  } else {
    RoomRepository.delete(room.getRoomName());
  }
};
