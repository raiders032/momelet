const { frontController } = require("./frontController");
const { togetherController } = require("./togetherController");
const { gameStartController } = require("./gameStartController");
const { gameFinishController } = require("./gameFinishController");
const { gameRestartController } = require("./gameRestartController");
const { disconnectingController } = require("./disconnectingController");
const { disconnectController } = require("./disconnectController");

module.exports.frontController = frontController;
module.exports.togetherController = togetherController;
module.exports.gameStartController = gameStartController;
module.exports.gameFinishController = gameFinishController;
module.exports.gameRestartController = gameRestartController;
module.exports.disconnectingController = disconnectingController;
module.exports.disconnectController = disconnectController;
