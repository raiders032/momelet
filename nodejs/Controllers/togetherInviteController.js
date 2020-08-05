const { togetherInviteService } = require("../Services/index.js");

const togetherInviteController = (socket, msg) => {
  return togetherInviteService(socket, msg);
};

module.exports = {
  togetherInviteController,
};
