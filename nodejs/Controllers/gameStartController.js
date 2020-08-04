const { gameStartService } = require("../Services/index");

const gameStartController = (socket, msg) => {
  return gameStartService(socket, msg);
};

module.exports = {
  gameStartController,
};
