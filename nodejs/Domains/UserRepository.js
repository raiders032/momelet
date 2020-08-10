const { User } = require("./User");

class UserRepository {
  constructor() {
    this.userRepository = new Map(); // key: id, value: User
  }

  add(socketId, userInfo) {
    this.userRepository.set(new User(socketId, userInfo));
  }

  delete(id) {
    this.userRepository.delete(id);
  }

  findById(id) {
    return this.userRepository.get(id);
  }
}

module.exports.UserRepository = UserRepository;
