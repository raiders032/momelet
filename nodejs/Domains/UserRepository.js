import User from "./User.js";
import {
  UserNotFoundByIdError,
  UserNotFoundBySocketIdError,
} from "../Errors/RepositoryError.js";

export default class UserRepository {
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
    if (!this.userRepository.has(id)) throw new UserNotFoundByIdError();
    return this.userRepository.get(id);
  }

  findBySocketId(socketId) {
    if (!this.socketIdMapper.has(socketId))
      throw new UserNotFoundBySocketIdError();
    return this.userRepository.get(this.socketIdMapper.get(socketId));
  }

  existById(id) {
    return this.userRepository.has(id);
  }

  findAll() {
    return Array.from(this.userRepository.values());
  }
}
