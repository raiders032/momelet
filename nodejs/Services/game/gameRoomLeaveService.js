const gameRoomLeaveService = (socket, msg) => {
  var echo = "gameRoomLeave 이벤트. 받은 msg: " + msg;
  console.log(echo);

  return echo;
};

module.exports = {
  gameRoomLeaveService,
};
