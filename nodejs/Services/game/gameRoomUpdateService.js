const SingleObject = require("../../SingleObjects");
const { logger } = require("../../logger");

const gameRoomUpdateService = (socket, room, id) => {
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
    msg.gameRoomUserList = room.getUserList().map((user) => {
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

module.exports = {
  gameRoomUpdateService,
};
