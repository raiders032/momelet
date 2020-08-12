const service = require("../Services/index");

const togetherController = (socket) => {
  // 같이하기;
  socket.on("together", (msg, fn) => {
    const ret = service.togetherService(socket, msg);
    // socket.emit("together", ret);
    fn(ret);
  });

  // 같이하기-초대하기
  socket.on("togetherInvite", (msg, fn) => {
    const ret = service.togetherInviteService(socket, msg);
    //socket.emit("togetherInvite", ret);
    fn(ret);
  });

  // 초대수락
  socket.on("togetherInvitation", (msg, fn) => {
    const ret = service.togetherInvitationService(socket, msg);
    // socket.emit("togetherInvitation", ret);
    fn(ret);
  });
};

module.exports.togetherController = togetherController;
