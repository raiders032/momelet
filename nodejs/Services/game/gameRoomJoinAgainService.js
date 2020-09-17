import * as SingleObject from "../../SingleObjects.js";
import logger from "../../logger.js";
import gameRoomUpdateService from "./gameRoomUpdateService.js";
import SocketResponse from "../../SocketResponse.js";

export default (socket, { id, roomName }) => {
  let response = new SocketResponse();
  let data = {};

  const room = SingleObject.RoomRepository.findByRoomName(roomName);
  if (room.getIsStarted() === false && room.findUserById(id)) {
    const user = SingleObject.UserRepository.findById(id);
    user.socket.join(roomName);
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
    gameRoomUpdateService(socket, room);
  } else {
    response.isFail(330);
  }

  return response;
};
