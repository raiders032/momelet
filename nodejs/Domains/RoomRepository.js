import Room from "./Room.js";
import {
  ERR_ROOM_NOT_FOUND,
  ERR_ROOM_ADD_FAIL,
} from "../Errors/RepositoryError.js";
export default class RoomRepository {
  constructor() {
    this.roomRepository = new Map();
  }

  add(id) {
    const roomName = String(id + Date.now());
    const newRoom = new Room(roomName, id);

    if (this.roomRepository.has(roomName)) throw new ERR_ROOM_ADD_FAIL();

    this.roomRepository.set(roomName, newRoom);
    return newRoom;
  }

  delete(roomName) {
    if (!this.roomRepository.has(roomName)) throw new ERR_ROOM_NOT_FOUND();
    this.roomRepository.delete(roomName);
    return true;
  }

  findByRoomName(roomName) {
    if (!this.roomRepository.has(roomName)) return false;
    // throw new ERR_ROOM_NOT_EXIST();
    return this.roomRepository.get(roomName);
  }
}
