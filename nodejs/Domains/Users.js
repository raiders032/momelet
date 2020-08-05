class Users {
  constructor() {
    this.connectedUsers = new Map(); // key: socketId, value: userInfo
    this.canPlayGameUsers = new Set(); // value: socketId
    this.connectedUsersForCheck = new Set(); // value: id
  }

  addConnectedUser = (
    socketId,
    { id, email, name, imageUrl, JWT, latitude, longitude }
  ) => {
    this.connectedUsers.set(socketId, {
      id,
      email,
      name,
      imageUrl,
      JWT,
      latitude,
      longitude,
    });

    this.addConnectedUserForCheck(id);
  };

  addConnectedUserForCheck = (id) => {
    this.connectedUsersForCheck.add(id);
  };

  checkUserAlreadyConnected = (id) => !this.connectedUsersForCheck.has(id);

  // 하나의 소켓에 대해서 마치 disctructor 처럼 동작
  deleteDisconnectedUser = (socketId) => {
    let { id } = this.connectedUsers.get(socketId);
    this.connectedUsersForCheck.delete(id);
    this.canPlayGameUsers.delete(socketId);
    this.connectedUsers.delete(socketId);
  };
}

module.exports.Users = Users;
