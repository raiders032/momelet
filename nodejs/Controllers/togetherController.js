// const service = require("../Services/index");s
import { togetherService, togetherInviteService } from "../Services/index.js";
import msgTypeCheck from "./msgTypeCheck.js";
import logger from "../logger.js";

export default (socket, errorHandler) => {
  // 같이하기;
  socket.on("together", (msg, ack) => {
    logger.info("together. msg: " + msg);
    let response = errorHandler(() => {
      const { id, latitude, longitude } = JSON.parse(msg);
      msgTypeCheck({ number: [id, latitude, longitude] });
      return togetherService({ id, latitude, longitude });
    });
    ack(JSON.stringify(response));
  });

  // 같이하기-초대하기
  socket.on("togetherInvite", (msg, ack) => {
    logger.info("together. msg: " + msg);
    let response = errorHandler(() => {
      const { id, inviteTheseUsers } = JSON.parse(msg);
      msgTypeCheck({ number: [id], Array: [inviteTheseUsers] });
      return togetherInviteService(socket, { id, inviteTheseUsers });
    });
    ack(JSON.stringify(response));
  });
};
