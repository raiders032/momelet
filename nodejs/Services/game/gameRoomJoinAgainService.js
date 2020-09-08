const SingleObject = require("../../SingleObjects");
const { logger } = require("../../logger");
const { gameRoomUpdateService } = require("./gameRoomUpdateService");

const gameRoomJoinAgainService = (socket, msg) => {
  var echo = "gameRoomJoinAgain. msg: " + msg;
  logger.info(echo);

  let retMsg = {
    status: "fail",
    gameRoomUserList: null,
    hostId: null,
  };
  let id, roomName;
  try {
    const parsedMsg = JSON.parse(msg);
    id = parsedMsg.id;
    roomName = parsedMsg.roomName;
  } catch (err) {
    logger.error("gameRoomJoinAgain Msg parse error: " + err);
    return JSON.stringify(retMsg);
  }

  const room = SingleObject.RoomRepository.findByRoomName(roomName);
  if (
    room !== false &&
    room.getIsStarted() === false &&
    room.findUserById(id)
  ) {
    const user = SingleObject.UserRepository.findById(id);
    user.updateCanReceive(true);
    retMsg.status = "ok";
    retMsg.gameRoomUserList = room
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

    retMsg.hostId = room.getHostId();
    gameRoomUpdateService(socket, room, id);
  }

  retMsg = JSON.stringify(retMsg);
  return retMsg;
};

module.exports = {
  gameRoomJoinAgainService,
};
