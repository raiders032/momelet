class RoomRepository {
  constructor() {
    this.roomRepository = new Map();
  }

  add(id) {
    const roomName = id + Date.now();
    const newRoom = new Room(roomName, id);

    if (this.roomRepository.has(roomName)) return null;

    this.roomRepository.set(newRoom);
    return roomName;
  }

  delete(roomName) {
    if (!this.roomRepository.has(roomName)) return false;
    this.roomRepository.delete(roomName);
    return true;
  }

  findByRoomName(roomName) {
    if (!this.roomRepository.has(roomName)) return false;
    return this.roomRepository.get(roomName);
  }
}

module.exports.RoomRepository = RoomRepository;
