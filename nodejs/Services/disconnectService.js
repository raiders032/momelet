const singleObject = require("../singleObjects");

const disconnectService = (socket) => {
  console.log("user disconnected");

  // return true or false
  singleObject.userList.delete(socket.id);
  console.log("나간 후 유저리스트");
  console.log(singleObject.userList);
};

module.exports = {
  disconnectService,
};
