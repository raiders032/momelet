const SingleObject = require("../../SingleObjects");
const { logger } = require("../../logger");
const { gameRoomUpdateService } = require("../index");

const exitExistRoom = (socket, user, id) => {
  const room = SingleObject.RoomRepository.findByRoomName(user.joinedRoomName);
  if (room === false) {
    user.updateJoinedRoomName(null);
    return;
  }
  if (room.deleteUser(user) === 0) {
    SingleObject.RoomRepository.delete(room.getRoomName());
    return;
  }
  gameRoomUpdateService(socket, room, id);
};

const inviteUsers = (socket, inviteUsers, roomName, host) => {
  const inviteMsg = JSON.stringify({
    roomName,
    hostName: host.name,
  });
  for (let user of inviteUsers) {
    socket.to(user).emit("togetherInvitation", inviteMsg);
  }
};

const togetherInviteService = (socket, msg) => {
  const echo = "togetherInviteService. msg: " + msg;
  logger.info(echo);
  let retMsg = { roomName: null, gameRoomUserList: null };
  let user, room, roomName;

  try {
    const { id, inviteTheseUsers } = JSON.parse(msg);
    user = SingleObject.UserRepository.findById(id);
    room = SingleObject.RoomRepository.add(id);
    roomName = room.getRoomName();

    // 기존 접속 방에서 나가기
    if (user.joinedRoomName !== null) {
      exitExistRoom(socket, user, id);
    }
    room.addUser(user);
    user.updateJoinedRoomName(roomName);

    inviteUsers(socket, inviteTheseUsers, roomName, user);

    retMsg.roomName = roomName;
    retMsg.gameRoomUserList = room.getUserList();
    retMsg.hostId = user.id;
  } catch (err) {
    logger.error("togetherInviteService Error: " + err);
    retMsg.roomName = null;
    retMsg.gameRoomUserList = null;
    retMsg.hostId = null;
  }

  retMsg = JSON.stringify(retMsg);
  return retMsg;
};

module.exports = {
  togetherInviteService,
};
