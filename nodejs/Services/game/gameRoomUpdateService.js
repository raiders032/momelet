import logger from "../../logger.js";
import SocketResponse from "../../socketResponse.js";
import { ERR_ROOM_NOT_EXIST } from "../../Errors/RepositoryError.js";
export default (socket, room, id) => {
  logger.info(
    "gameRoomUpdateService. roomName: " + room.getRoomName() + ", id: " + id
  );

  // if (room === false || room === undefined) throw new ERR_ROOM_NOT_EXIST();
  let response = new SocketResponse();
  let data = {};

  const users = room.getUserList();
  data.gameRoomUserList = room
    .getUserList()
    .filter((user) => user.getCanReceive())
    .map((user) => {
      const { id, name, imageUrl } = user;
      return { id, name, imageUrl };
    });
  data.hostId = room.getHostId();
  response.isOk(data);

  users
    .filter((user) => user.getCanReceive() && id !== user.id)
    .forEach((user) => {
      socket.to(user.socketId).emit("gameRoomUpdate", JSON.stringify(response));
    });
};
