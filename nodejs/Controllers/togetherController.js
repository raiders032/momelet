// const service = require("../Services/index");s
import * as service from "../Services/index.js";
import logger from "../logger.js";
export default (socket) => {
  // 같이하기;
  socket.on("together", (msg, ack) => {
    logger.info("together. msg: " + msg);
    const { id, latitude, longitude } = JSON.parse(msg);
    if (
      (id === undefined) |
      (latitude === undefined) |
      (longitude === undefined)
    )
      throw new Error("type error");
    if (
      (typeof id !== "number") |
      (typeof latitude !== "number") |
      (typeof longitude !== "number")
    )
      throw new Error("type error");

    const ret = service.togetherService({ id, latitude, longitude });
    ack(ret);
  });

  // 같이하기-초대하기
  socket.on("togetherInvite", (msg, ack) => {
    const ret = service.togetherInviteService(socket, msg);
    ack(ret);
  });
};
