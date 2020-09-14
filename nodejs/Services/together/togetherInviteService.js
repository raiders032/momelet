import * as SingleObject from "../../SingleObjects.js";
import gameRoomUpdateService from "../game/gameRoomUpdateService.js";
import SocketResponse from "../../SocketResponse.js";

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
  if (user.joinedRoomName !== null) {
    exitExistRoom(socket, user, id);
  }
  room.addUser(user);
  user.updateJoinedRoomName(roomName);

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
