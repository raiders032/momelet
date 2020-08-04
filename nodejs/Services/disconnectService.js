const SingleObject = require("../SingleObjects");

const disconnectService = (socket) => {
  console.log("user disconnected");

  // return true or false
  SingleObject.userList.delete(socket.id);
  console.log("나간 후 유저리스트");
  console.log(SingleObject.userList);
};

module.exports = {
  disconnectService,
};
