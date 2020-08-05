const service = require("./eventService");

// 같이하기
const togetherController = (socket, msg) => {
  return service.togetherService(socket, msg);
};

// 같이하기-초대하기
const togetherInviteController = (socket, msg) => {
  return service.togetherInviteService(socket, msg);
};

// 초대수락
const togetherAcceptController = (socket, msg) => {
  return service.togetherAcceptService(socket, msg);
};

// 게임시작
const gameStartController = (socket, msg) => {
  return service.gameStartService(socket, msg);
};

// 게임종료
const gameFinishController = (socket, msg) => {
  return service.gameFinishService(socket, msg);
};

// 다시하기
const gameRestartController = (socket, msg) => {
  return service.gameRestartService(socket, msg);
};

// 연결이 끊어지는 중
const disconnectingController = (socket, reason) => {
  return service.disconnectingService(socket, reason);
};
// 연결 해제
const disconnectController = (socket) => {
  // 모든 방에서 나가는 로직 추가 필요
  //
  return service.disconnectService(socket);
};

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
