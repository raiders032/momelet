import logger from "../../logger.js";
export default (socket, msg) => {
  var echo = "togetherInvitation. msg: " + msg;
  logger.info(echo);

  return echo;
};
