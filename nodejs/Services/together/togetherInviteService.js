const SingleObject = require("../../SingleObjects");

const togetherInviteService = (socket, msg) => {
  const echo = "togetherInviteService 이벤트. 받은 msg: " + msg;
  console.log(echo);

  const socketId = socket.id;
  const roomName = socketId + "_room";
  const inviteUsers = msg;

  for (let user of inviteUsers) {
    socket.to(user).emit("togetherInvite", roomName);
  }

  const ret = JSON.stringify({
    roomName,
  });
  return ret;
};

module.exports = {
  togetherInviteService,
};
