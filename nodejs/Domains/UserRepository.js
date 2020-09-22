import User from "./User.js";
import { ERR_USER_NOT_FOUND } from "../Errors/RepositoryError.js";

export default class UserRepository {
  constructor() {
    this.userRepository = new Map(); // key: id, value: User
    this.socketIdMapper = new Map(); // key: socketId, value: id
  }

  add(socket, userInfo) {
    let { id } = userInfo;
    this.userRepository.set(id, new User(socket, userInfo));
    this.socketIdMapper.set(socket.id, userInfo.id);
  }

  delete(socketId) {
    console.log("소켓매퍼 목록 출력");
    this.socketIdMapper.forEach((value, key) => {
      console.log("소켓아이디: " + key);
      console.log("유저아이디: " + value);
    });
    console.log("안돼! 날 지우지마! 내아이디: " + socketId);
    this.userRepository.delete(this.findBySocketId(socketId).id);
    this.socketIdMapper.delete(socketId);
  }

  findById(id) {
    if (!this.userRepository.has(id)) throw new ERR_USER_NOT_FOUND();
    return this.userRepository.get(id);
  }

  findBySocketId(socketId) {
    if (!this.socketIdMapper.has(socketId)) throw new ERR_USER_NOT_FOUND();
    return this.userRepository.get(this.socketIdMapper.get(socketId));
  }

  existById(id) {
    return this.userRepository.has(id);
  }

  findAll() {
    return Array.from(this.userRepository.values());
  }
}
