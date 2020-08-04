const { frontController } = require("./frontController");
const { togetherController } = require("./togetherController");
const { togetherInviteController } = require("./togetherInviteController");
const { togetherAcceptController } = require("./togetherAcceptController");
const { gameStartController } = require("./gameStartController");
const { gameFinishController } = require("./gameFinishController");
const { gameRestartController } = require("./gameRestartController");
const { disconnectingController } = require("./disconnectingController");
const { disconnectController } = require("./disconnectController");
// module.exports = {
//   frontController,
//   togetherController,
//   togetherInviteController,
//   togetherAcceptController,
//   gameStartController,
//   gameFinishController,
//   gameRestartController,
//   disconnectingController,
//   disconnectController,
// };
module.exports.frontController = frontController;
module.exports.togetherController = togetherController;
module.exports.togetherInviteController = togetherInviteController;
module.exports.togetherAcceptController = togetherAcceptController;
module.exports.gameStartController = gameStartController;
module.exports.gameFinishController = gameFinishController;
module.exports.gameRestartController = gameRestartController;
module.exports.disconnectingController = disconnectingController;
module.exports.disconnectController = disconnectController;
