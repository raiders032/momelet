const ResourceNotFoundError = require("../Errors/ResourceNotFoundError");
const Room = require("./Room");
class RoomRepository {
  constructor() {
    this.roomRepository = new Map();
  }

  add(id) {
    const roomName = id + Date.now();
    const newRoom = new Room(roomName, id);

    if (this.roomRepository.has(roomName)) return null;

    this.roomRepository.set(newRoom);
    return newRoom;
  }

  delete(roomName) {
    if (!this.roomRepository.has(roomName))
      throw new ResourceNotFoundError(404, "해당 방을 찾을 수 없습니다.");
    this.roomRepository.delete(roomName);
    return true;
  }

  findByRoomName(roomName) {
    if (!this.roomRepository.has(roomName)) return false;
    return this.roomRepository.get(roomName);
  }
}

module.exports.RoomRepository = RoomRepository;
