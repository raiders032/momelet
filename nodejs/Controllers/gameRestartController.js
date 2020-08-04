const { gameRestartService } = require("../Services/index");

const gameRestartController = (socket, msg) => {
  return gameRestartService(socket, msg);
};

module.exports = {
  gameRestartController,
};
