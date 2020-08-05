const SingleObject = require("../SingleObjects");

const disconnectService = (socket) => {
  console.log("user disconnected");

  // return true or false
  SingleObject.Users.updateDisconnectedUser(socket.id);
  console.log("나간 후 유저리스트");
  console.log(SingleObject.Users.connectedUsers);
  console.log(SingleObject.Users.connectedUsersForCheck);
};

module.exports = {
  disconnectService,
};
