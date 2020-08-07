const togetherInvitationService = (socket, msg) => {
  var echo = "togetherInvitation 이벤트. 받은 msg: " + msg;
  console.log(echo);

  return echo;
};

module.exports = {
  togetherInvitationService,
};
