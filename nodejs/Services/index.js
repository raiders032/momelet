const { togetherService } = require("./togetherService");
const { togetherInviteService } = require("./togetherInviteService");
const { togetherAcceptService } = require("./togetherAcceptService");
const { gameStartService } = require("./gameStartService");
const { gameFinishService } = require("./gameFinishService");
const { gameRestartService } = require("./gameRestartService");
const { disconnectingService } = require("./disconnectingService");
const { disconnectService } = require("./disconnectService");
// module.exports = {
//   togetherService,
//   togetherInviteService,
//   togetherAcceptService,
//   gameStartService,
//   gameFinishService,
//   gameRestartService,
//   disconnectingService,
//   disconnectService,
// };

module.exports.togetherService = togetherService;
module.exports.togetherInviteService = togetherInviteService;
module.exports.togetherAcceptService = togetherAcceptService;
module.exports.gameStartService = gameStartService;
module.exports.gameFinishService = gameFinishService;
module.exports.gameRestartService = gameRestartService;
module.exports.disconnectingService = disconnectingService;
module.exports.disconnectService = disconnectService;
