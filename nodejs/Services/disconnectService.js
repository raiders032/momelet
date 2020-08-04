const singleObject = require("../singleObjects");

const disconnectService = (socket) => {
  console.log("user disconnected");

  // return true or false
  singleObject.userList.delete(socket.id);
};

module.exports = {
  disconnectService,
};
