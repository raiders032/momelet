const gameRoomUpdateService = (socket, msg) => {
  var echo = "gameRoomUpdate 이벤트. 받은 msg: " + msg;
  console.log(echo);

  return echo;
};

module.exports = {
  gameRoomUpdateService,
};
