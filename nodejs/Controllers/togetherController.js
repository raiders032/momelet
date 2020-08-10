const service = require("../Services/index");

const togetherController = (socket) => {
  // 같이하기;
  socket.on("together", (msg) => {
    const ret = service.togetherService(socket, msg);
    socket.emit("together", ret);
  });

  // 같이하기-초대하기
  socket.on("togetherInvite", (msg) => {
    const ret = service.togetherInviteService(socket, msg);
    socket.emit("togetherInvite", ret);
  });

  // 초대수락
  socket.on("togetherInvitation", (msg) => {
    const ret = service.togetherInvitationService(socket, msg);
    socket.emit("togetherInvitation", ret);
  });
};

module.exports.togetherController = togetherController;
