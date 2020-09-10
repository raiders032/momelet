// const service = require("../Services/index");s
import { togetherService, togetherInviteService } from "../Services/index.js";
import msgTypeCheck from "./msgTypeCheck.js";
import logger from "../logger.js";

export default (socket) => {
  // 같이하기;
  socket.on("together", (msg, ack) => {
    logger.info("together. msg: " + msg);
    const { id, latitude, longitude } = JSON.parse(msg);
    msgTypeCheck({ number: [id, latitude, longitude] });

    ack(JSON.stringify(togetherService({ id, latitude, longitude })));
  });

  // 같이하기-초대하기
  socket.on("togetherInvite", (msg, ack) => {
    logger.info("together. msg: " + msg);
    const { id, inviteTheseUsers } = JSON.parse(msg);
    msgTypeCheck({ number: [id], Array: inviteTheseUsers });

    ack(
      JSON.stringify(togetherInviteService(socket, { id, inviteTheseUsers }))
    );
  });
};
