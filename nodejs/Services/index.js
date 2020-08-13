// together
const { togetherService } = require("./together/togetherService");
const { togetherInviteService } = require("./together/togetherInviteService");
const {
  togetherInvitationService,
} = require("./together/togetherInvitationService");

// game
const { gameRoomJoinService } = require("./game/gameRoomJoinService");
const { gameRoomLeaveService } = require("./game/gameRoomLeaveService");
const { gameStartService } = require("./game/gameStartService");
const { gameUserFinishService } = require("./game/gameUserFinishService");
const { gameAllFinishService } = require("./game/gameAllFinishService");
const { gameRestartService } = require("./game/gameRestartService");

// disconnect
const { disconnectingService } = require("./disconnect/disconnectingService");
const { disconnectService } = require("./disconnect/disconnectService");

module.exports.togetherService = togetherService;
module.exports.togetherInviteService = togetherInviteService;
module.exports.togetherInvitationService = togetherInvitationService;
module.exports.gameRoomJoinService = gameRoomJoinService;
module.exports.gameRoomLeaveService = gameRoomLeaveService;
module.exports.gameStartService = gameStartService;
module.exports.gameUserFinishService = gameUserFinishService;
module.exports.gameAllFinishService = gameAllFinishService;
module.exports.gameRestartService = gameRestartService;
module.exports.disconnectingService = disconnectingService;
module.exports.disconnectService = disconnectService;
