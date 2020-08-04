const appication = require("../app");

const disconnectService = (socket) => {
  console.log("user disconnected");

  // return true or false
  appication.userList.delete(socket.id);
};

module.exports = {
  disconnectService,
};
