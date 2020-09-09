import logger from "../../logger.js";
import SocketResponse from "../../socketResponse.js";

export default (socket, room, id) => {
  let response = new SocketResponse();
  let data = {};
  const echo =
    "gameRoomUpdateService. roomName: " + room.getRoomName() + ", id: " + id;
  logger.info(echo);

  if (room === undefined) return;
  const users = room.getUserList();

  try {
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
        socket
          .to(user.socketId)
          .emit("gameRoomUpdate", JSON.stringify(response));
      });
  } catch (err) {
    logger.error("gameRoomUpdateService " + err);
  }
};
