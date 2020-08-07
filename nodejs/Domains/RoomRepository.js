class RoomRepository {
  constructor() {
    this.roomRepository = new Map();
  }

  addRoom = (room) => {
    if (this.roomRepository.has(room.roomName))
      throw new Error("같은 이름의 방이 이미 존재합니다.");
    this.roomRepository.set(room.roomName, room);
  };

  deleteRoom = (room) => {
    if (!this.roomRepository.has(room.roomName))
      throw new Error("해당 방이 이미 존재하지 않습니다.");
    this.roomRepository.delete(room.roomName);
  };

  findRoomByRoomName = (roomName) => {
    return this.roomRepository.get(roomName);
  };
}
