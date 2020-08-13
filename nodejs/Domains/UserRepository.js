const { User } = require("./User");
const ResourceNotFoundError = require("../Errors/ResourceNotFoundError");
class UserRepository {
  constructor() {
    this.userRepository = new Map(); // key: id, value: User
    this.socketIdMapper = new Map(); // key: socketId, value: id
  }

  add(socketId, userInfo) {
    let { id } = userInfo;
    this.userRepository.set(id, new User(socketId, userInfo));
    this.socketIdMapper.set(socketId, userInfo.id);
  }

  delete(socketId) {
    this.userRepository.delete(this.findBySocketId(socketId).id);
    this.socketIdMapper.delete(socketId);
  }

  findById(id) {
    if (!this.userRepository.has(id))
      throw new ResourceNotFoundError(404, "해당 유저를 찾을 수 없습니다.");
    return this.userRepository.get(id);
  }

  findBySocketId(socketId) {
    return this.userRepository.get(this.socketIdMapper.get(socketId));
  }

  existsById(id) {
    return this.userRepository.has(id);
  }

  findAll() {
    return Array.from(this.userRepository.values());
  }
}

module.exports.UserRepository = UserRepository;
