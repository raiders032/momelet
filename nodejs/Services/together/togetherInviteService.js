import * as SingleObject from "../../SingleObjects.js";
import logger from "../../logger.js";
import gameRoomUpdateService from "../game/gameRoomUpdateService.js";
import SocketResponse from "../../socketResponse.js";

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
  const inviteMsg = new SocketResponse(true, null, {
    roomName,
    hostId: host.id,
  });
  for (let user of inviteUsers) {
    socket.to(user).emit("togetherInvitation", JSON.stringify(inviteMsg));
  }
};

export default (socket, msg) => {
  const echo = "togetherInviteService. msg: " + msg;
  logger.info(echo);
  let response = new SocketResponse();
  let user, room, roomName, gameRoomUserList, hostId;

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

    gameRoomUserList = room.getUserList();
    hostId = user.id;
    response.isOk({ roomName, gameRoomUserList, hostId });
  } catch (err) {
    logger.error("togetherInviteService Error: " + err);
    response.isFail("togetherInviteService.error");
  }
  return JSON.stringify(response);
};
