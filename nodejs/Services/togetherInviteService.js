const togetherInviteService = (socket, msg) => {
  let roomName = socket.id + "_room";
  socket.join(roomName);

  const inviteUsers = msg;
  for (let user of inviteUsers) {
    socket.to(user).emit("togetherInvite", roomName);
  }
  return roomName;
};

module.exports = {
  togetherInviteService,
};
