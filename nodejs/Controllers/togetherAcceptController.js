const { togetherAcceptService } = require("../Services/index");

const togetherAcceptController = (socket, msg) => {
  return togetherAcceptService(socket, msg);
};

module.exports = {
  togetherAcceptController,
};
