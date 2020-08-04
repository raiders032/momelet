const { frontController } = require("./frontController");
const { togetherController } = require("./togetherController");
const { gameController } = require("./gameController");
const { disconnectController } = require("./disconnectController");

module.exports.frontController = frontController;
module.exports.togetherController = togetherController;
module.exports.gameController = gameController;
module.exports.disconnectController = disconnectController;
