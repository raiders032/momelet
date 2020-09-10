// const service = require("../Services/index");s
import * as service from "../Services/index.js";
export default (socket) => {
  // 같이하기;
  socket.on("together", (msg, ack) => {
    // const ret = service.togetherService(socket, msg);
    const ret = service.togetherService(socket, msg);
    // socket.emit("together", ret);
    ack(ret);
  });

  // 같이하기-초대하기
  socket.on("togetherInvite", (msg, ack) => {
    const ret = service.togetherInviteService(socket, msg);
    //socket.emit("togetherInvite", ret);
    ack(ret);
  });

  // 초대수락
  socket.on("togetherInvitation", (msg, ack) => {
    const ret = service.togetherInvitationService(socket, msg);
    // socket.emit("togetherInvitation", ret);
    ack(ret);
  });
};
