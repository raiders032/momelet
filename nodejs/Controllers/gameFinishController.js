const { gameFinishService } = require("../Services/index");

const gameFinishController = (socket, msg) => {
  return gameFinishService(socket, msg);
};

module.exports = {
  gameFinishController,
};
