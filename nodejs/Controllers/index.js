const { togetherController } = require("./togetherController");
const { togetherInviteController } = require("./togetherInviteController");
const { togetherAcceptController } = require("./togetherAcceptController");
const { gameStartController } = require("./gameStartController");
const { gameFinishController } = require("./gameFinishController");
const { gameRestartController } = require("./gameRestartController");
const { disconnectingController } = require("./disconnectingController");
const { disconnectController } = require("./disconnectController");
module.exports = {
  togetherController,
  togetherInviteController,
  togetherAcceptController,
  gameStartController,
  gameFinishController,
  gameRestartController,
  disconnectingController,
  disconnectController,
};
