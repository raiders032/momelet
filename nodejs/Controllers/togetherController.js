const { togetherService } = require("../Services/index.js");

const togetherController = (socket, msg) => {
  return togetherService(socket, msg);
};

module.exports = {
  togetherController,
};
