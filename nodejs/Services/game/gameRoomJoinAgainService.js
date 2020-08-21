const SingleObject = require("../../SingleObjects");

const gameRoomJoinAgainService = (socket, msg) => {
  var echo = "gameRoomJoinAgain 이벤트. 받은 msg: " + msg;
  console.log(echo);

  const { id, roomName } = JSON.parse(msg);
  const room = SingleObject.RoomRepository.findByRoomName(roomName);
  const user = SingleObject.UserRepository.findById(id);

  let retMsg = {
    status: "fail",
    gameUserList: null,
  };

  if (room.getIsStarted() === false && room.findUserById(user.getId())) {
    user.updateCanReceive(true);
    retMsg.status = "ok";
    retMsg.gameUserList = room
      .getUserList()
      .filter((user) => user.getCanReceive())
      .map((user) => {
        const { id, name, imageUrl } = user;
        const userDto = { id, name, imageUrl };
        return userDto;
      });
  }

  retMsg = JSON.stringify(retMsg);
  return retMsg;
};

module.exports = {
  gameRoomJoinAgainService,
};
