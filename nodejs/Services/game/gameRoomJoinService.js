const gameRoomJoinService = (socket, msg) => {
  var echo = "gameRoomJoin 이벤트. 받은 msg: " + msg;
  console.log(echo);

  return echo;
};

module.exports = {
  gameRoomJoinService,
};
