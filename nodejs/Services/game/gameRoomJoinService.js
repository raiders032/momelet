const SingleObject = require("../../SingleObjects");
const { gameRoomUpdateService } = require("./gameRoomUpdateService");

const gameRoomJoinService = (socket, msg) => {
  var echo = "gameRoomJoin 이벤트. 받은 msg: " + msg;
  console.log(echo);

  const { id, roomName } = JSON.parse(msg);
  const room = SingleObject.RoomRepository.findByRoomName(roomName);
  const user = SingleObject.UserRepository.findById(id);

  let retMsg = {
    status: "fail",
    roomName: null,
    gameRoomUserList: null,
    hostId: null,
  };

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
