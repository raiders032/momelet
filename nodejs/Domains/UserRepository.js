const { User } = require("./User");

class UserRepository {
  constructor() {
    this.userRepository = new Map(); // key: id, value: User
    this.socketIdMapper = new Map(); // key: socketId, value: id
  }

  add(socketId, userInfo) {
    this.userRepository.set(new User(socketId, userInfo));
    this.socketIdMapper.set(socketId, userInfo.id);
  }

  delete(socketId) {
    this.userRepository.delete(this.findBySocketId(socketId));
    this.socketIdMapper.delete(socketId);
  }

  findById(id) {
    return this.userRepository.get(id);
  }

  findBySocketId(socketId) {
    return this.userRepository.get(this.socketIdMapper.get(socketId));
  }

  existsById(id) {
    return this.userRepository.has(id);
  }
}

module.exports.UserRepository = UserRepository;
