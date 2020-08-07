const { User } = require("./User");

class UserRepository {
  constructor() {
    this.connectedUserRepository = new Map(); // key: socketId, value: User
    this.canPlayGameUserRepository = new Set(); // value: socketId
    this.connectedUserRepositoryForCheck = new Set(); // value: id
  }

  addConnectedUser = (socketId, userInfo) => {
    this.connectedUserRepository.set(socketId, new User(socketId, userInfo));
  };
  addCanPlayGameUser = (socketId) =>
    this.canPlayGameUserRepository.add(socketId);
  addConnectedUserForCheck = (id) =>
    this.connectedUserRepositoryForCheck.add(id);

  deleteConnectedUser = (socketId) =>
    this.connectedUserRepository.delete(socketId);
  deleteCanPlayGameUser = (socketId) =>
    this.canPlayGameUserRepository.delete(socketId);
  deleteConnectedUserForCheck = (id) =>
    this.connectedUserRepositoryForCheck.delete(id);

  // 새로운 유저 접속시 수행하는 메소드(wrapper 메소드)
  updateConnectedUser = (socketId, userInfo) => {
    let { id } = userInfo;
    this.addConnectedUser(socketId, userInfo);
    this.addCanPlayGameUser(socketId);
    this.addConnectedUserForCheck(id);
  };
  // 유저가 접속이 끊기면 수행하는 메소드(wrapper 메소드). 하나의 소켓에 대해서 마치 disctructor 처럼 동작
  updateDisconnectedUser = (socketId) => {
    let { id } = this.connectedUserRepository.get(socketId);
    this.deleteConnectedUser(socketId);
    this.deleteCanPlayGameUser(socketId);
    this.deleteConnectedUserForCheck(id);
  };

  checkUserAlreadyConnected = (id) =>
    this.connectedUserRepositoryForCheck.has(id);

  // 유저가 접속해있는 방이름 변경
  updateUserJoinedRoomName = (socketId, roomName) => {
    let user = this.connectedUserRepository.get(socketId);

    if (roomName === undefined) {
      return false;
    } else if (roomName === null) {
      user.updateJoinedRoomName(null);
    } else {
      user.updateJoinedRoomName(roomName);
    }

    return true;
  };
}

module.exports.UserRepository = UserRepository;
