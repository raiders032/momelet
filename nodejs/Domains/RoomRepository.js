const Room = require("./Room");
class RoomRepository {
  constructor() {
    this.roomRepository = new Map();
  }

  add(id) {
    const roomName = String(id + Date.now());
    const newRoom = new Room(roomName, id);

    if (this.roomRepository.has(roomName)) return null;

    this.roomRepository.set(roomName, newRoom);
    return newRoom;
  }

  delete(roomName) {
    if (!this.roomRepository.has(roomName))
      throw "존재하지 않는 방을 삭제하려 하였습니다.";
    this.roomRepository.delete(roomName);
    return true;
  }

  findByRoomName(roomName) {
    if (!this.roomRepository.has(roomName)) return false;
    return this.roomRepository.get(roomName);
  }
}

module.exports.RoomRepository = RoomRepository;
