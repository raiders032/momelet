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
  };
  addCanPlayGameUser = (socketId) => this.canPlayGameUsers.add(socketId);
  addConnectedUserForCheck = (id) => this.connectedUsersForCheck.add(id);

  deleteConnectedUser = (socketId) => this.connectedUsers.delete(socketId);
  deleteCanPlayGameUser = (socketId) => this.canPlayGameUsers.delete(socketId);
  deleteConnectedUserForCheck = (id) => this.connectedUsersForCheck.delete(id);

  // 새로운 유저 접속시 수행하는 메소드
  updateConnectedUser = (socketId, userInfo) => {
    let { id } = userInfo;
    this.addConnectedUser(socketId, userInfo);
    this.addCanPlayGameUser(socketId);
    this.addConnectedUserForCheck(id);
  };
  // 유저가 접속이 끊기면 수행하는 메소드. 하나의 소켓에 대해서 마치 disctructor 처럼 동작
  updateDisconnectedUser = (socketId) => {
    let { id } = this.connectedUsers.get(socketId);
    this.deleteConnectedUser(socketId);
    this.deleteCanPlayGameUser(socketId);
    this.deleteConnectedUserForCheck(id);
  };

  checkUserAlreadyConnected = (id) => !this.connectedUsersForCheck.has(id);
}

module.exports.Users = Users;
