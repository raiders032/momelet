const { User } = require("./User");

class UserList {
  constructor() {
    this.connectedUserList = new Map(); // key: socketId, value: User
    this.canPlayGameUserList = new Set(); // value: socketId
    this.connectedUserListForCheck = new Set(); // value: id
  }

  addConnectedUser = (socketId, userInfo) => {
    this.connectedUserList.set(socketId, new User(socketId, userInfo));
  };
  addCanPlayGameUser = (socketId) => this.canPlayGameUserList.add(socketId);
  addConnectedUserForCheck = (id) => this.connectedUserListForCheck.add(id);

  deleteConnectedUser = (socketId) => this.connectedUserList.delete(socketId);
  deleteCanPlayGameUser = (socketId) =>
    this.canPlayGameUserList.delete(socketId);
  deleteConnectedUserForCheck = (id) =>
    this.connectedUserListForCheck.delete(id);

  // 새로운 유저 접속시 수행하는 메소드
  updateConnectedUser = (socketId, userInfo) => {
    let { id } = userInfo;
    this.addConnectedUser(socketId, userInfo);
    this.addCanPlayGameUser(socketId);
    this.addConnectedUserForCheck(id);
  };
  // 유저가 접속이 끊기면 수행하는 메소드. 하나의 소켓에 대해서 마치 disctructor 처럼 동작
  updateDisconnectedUser = (socketId) => {
    let { id } = this.connectedUserList.get(socketId);
    this.deleteConnectedUser(socketId);
    this.deleteCanPlayGameUser(socketId);
    this.deleteConnectedUserForCheck(id);
  };

  checkUserAlreadyConnected = (id) => !this.connectedUserListForCheck.has(id);

  setUserConnectedRoomName = (socketId, roomName) => {
    let user = this.connectedUserList.get(socketId);

    if (roomName === undefined) {
      return false;
    } else if (roomName === null) {
      user.setConnectedRoomName(socketId, null);
    } else {
      user.setConnectedRoomName(socketId, roomName);
    }

    return true;
  };
}

module.exports.UserList = UserList;
