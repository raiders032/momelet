class RoomRepository {
  constructor() {
    this.roomRepository = new Map();
  }

  addRoom(hostSocketId) {
    const roomName = hostSocketId + Date.now();
    const newRoom = new Room(roomName, hostSocketId);

    if (this.roomRepository.has(room.roomName)) return null;

    this.roomRepository.set(newRoom);
    return roomName;
  }

  deleteRoom(roomName) {
    if (!this.roomRepository.has(roomName)) return false;
    this.roomRepository.delete(roomName);
    return true;
  }

  findRoomByRoomName(roomName) {
    if (!this.roomRepository.has(roomName)) return false;
    return this.roomRepository.get(roomName);
  }
}
