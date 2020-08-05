const app = require("../app.js");

// 같이하기
const togetherService = (socket, msg) => {
  var echo = "together 이벤트. 받은 msg: " + msg;
  console.log(echo);
  socket.emit("together", echo);
  console.log("서비스에서 userList출력");
  console.log(app.userList);
  return echo;
};

module.exports = {
  togetherService,
};
