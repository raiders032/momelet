const { logger } = require("../../logger");
const togetherInvitationService = (socket, msg) => {
  var echo = "togetherInvitation. msg: " + msg;
  logger.info(echo);

  return echo;
};

module.exports = {
  togetherInvitationService,
};
