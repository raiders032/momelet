import * as SingleObject from "../../SingleObjects.js";
import SocketResponse from "../../SocketResponse.js";
import roomLeave from "../util/roomLeave.js";
import logger from "../../logger.js";

const inviteUsers = (socket, inviteUsers, roomName, host) => {
  const inviteMsg = new SocketResponse();
  inviteMsg.isOk({
    roomName,
    hostId: host.id,
  });
  for (let user of inviteUsers) {
    socket.to(user).emit("togetherInvitation", JSON.stringify(inviteMsg));
  }
};

export default (socket, { id, inviteTheseUsers }) => {
  let response = new SocketResponse();
  let data = {};

  let user, room, roomName;
  user = SingleObject.UserRepository.findById(id);
  room = SingleObject.RoomRepository.add(id);
  roomName = room.getRoomName();

  // 기존 접속 방에서 나가기
  try {
    if (user.joinedRoomName !== null) {
      roomLeave(
        user,
        SingleObject.RoomRepository.findByRoomName(user.joinedRoomName)
      );
    }
  } catch (err) {
    logger.error(err.stack);
  }
  room.addUser(user);

  let gameRoomUserList, hostId;
  gameRoomUserList = room.getUserInfo();
  hostId = user.id;

  data.roomName = roomName;
  data.gameRoomUserList = gameRoomUserList;
  data.hostId = hostId;

  response.isOk(data);
  // 유저 초대
  inviteUsers(socket, inviteTheseUsers, roomName, user);
  return response;
};
