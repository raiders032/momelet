const SingleObject = require("../../SingleObjects");
const { gameRoomUpdateService } = require("./gameRoomUpdateService");
const { logger } = require("../../logger");

const gameRoomJoinService = (socket, msg) => {
  var echo = "gameRoomJoin. msg: " + msg;
  logger.info(echo);

  const { id, roomName } = JSON.parse(msg);
  const room = SingleObject.RoomRepository.findByRoomName(roomName);
  const user = SingleObject.UserRepository.findById(id);

  let retMsg = {
    status: "fail",
    roomName: null,
    gameRoomUserList: null,
    hostId: null,
  };

  // 기존 접속 방에서 나가기
  if (user.joinedRoomName !== null) {
    if (room.deleteUser(user) === 0) {
      SingleObject.RoomRepository.delete(room.getRoomName());
    } else {
      gameRoomUpdateService(socket, roomName, id);
    }
    user.updateJoinedRoomName(null);
  }
  if (room.addUser(user)) {
    gameRoomUpdateService(socket, roomName, id);
    user.updateJoinedRoomName(roomName);
    retMsg.status = "success";
    retMsg.roomName = roomName;
    retMsg.gameRoomUserList = room.getUserList();
    retMsg.hostId = room.getHostId();
  }

  retMsg = JSON.stringify(retMsg);
  return retMsg;
};

module.exports = {
  gameRoomJoinService,
};
