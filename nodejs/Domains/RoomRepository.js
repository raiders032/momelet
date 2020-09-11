import Room from "./Room.js";
import {
  RoomNotFoundByRoomNameError,
  RoomNotExistError,
  RoomAlreadyExistError,
} from "../Errors/RepositoryError.js";
export default class RoomRepository {
  constructor() {
    this.roomRepository = new Map();
  }

  add(id) {
    const roomName = String(id + Date.now());
    const newRoom = new Room(roomName, id);

    if (this.roomRepository.has(roomName)) throw new RoomAlreadyExistError();

    this.roomRepository.set(roomName, newRoom);
    return newRoom;
  }

  delete(roomName) {
    if (!this.roomRepository.has(roomName)) throw new RoomNotExistError();
    this.roomRepository.delete(roomName);
    return true;
  }

  findByRoomName(roomName) {
    if (!this.roomRepository.has(roomName)) return false;
    // throw new RoomNotFoundByRoomNameError();
    return this.roomRepository.get(roomName);
  }
}
