const SingleObject = require("../../SingleObjects");
const { logger } = require("../../logger");

const gameRoomJoinAgainService = (socket, msg) => {
  var echo = "gameRoomJoinAgain. msg: " + msg;
  logger.info(echo);

  let retMsg = {
    status: "fail",
    gameUserList: null,
  };
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
    room.findUserById(user.getId())
  ) {
    const user = SingleObject.UserRepository.findById(id);
    user.updateCanReceive(true);
    retMsg.status = "ok";
    retMsg.gameUserList = room
      .getUserList()
      .filter((user) => user.getCanReceive())
      .map((user) => {
        const { id, name, imageUrl } = user;
        return { id, name, imageUrl };
      });
  }

  retMsg = JSON.stringify(retMsg);
  return retMsg;
};

module.exports = {
  gameRoomJoinAgainService,
};
