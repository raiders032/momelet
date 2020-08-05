const app = require("../app");

const disconnectService = (socket) => {
  console.log("user disconnected");

  // return true or false
  app.userList.delete(socket.id);
};

module.exports = {
  disconnectService,
};
