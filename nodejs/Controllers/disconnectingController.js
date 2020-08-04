const { disconnectingService } = require("../Services/index");

const disconnectingController = (socket, reason) => {
  return disconnectingService(socket, reason);
};

module.exports = {
  disconnectingController,
};
