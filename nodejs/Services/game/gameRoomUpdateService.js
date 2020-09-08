import logger from "../../logger.js";

export default (socket, room, id) => {
  const echo =
    "gameRoomUpdateService. roomName: " + room.getRoomName() + ", id: " + id;
  logger.info(echo);

  if (room === undefined) return;

  const users = room.getUserList();
  let msg = {
    gameRoomUserList: null,
    hostId: null,
  };

  try {
    msg.gameRoomUserList = room
      .getUserList()
      .filter((user) => user.getCanReceive())
      .map((user) => {
        const { id, name, imageUrl } = user;
        return { id, name, imageUrl };
      });
    msg.hostId = room.getHostId();
    msg = JSON.stringify(msg);

    users
      .filter((user) => user.getCanReceive() && id !== user.id)
      .forEach((user) => {
        socket.to(user.socketId).emit("gameRoomUpdate", msg);
      });
  } catch (err) {
    logger.error("gameRoomUpdateService " + err);
  }
};
