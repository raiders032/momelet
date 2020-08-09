class User {
  constructor(
    socketId,
    { id, email, name, imageUrl, JWT, latitude, longitude }
  ) {
    this.socketId = socketId;
    this.id = id;
    this.email = email;
    this.name = name;
    this.imageUrl = imageUrl;
    this.JWT = JWT;
    this.latitude = latitude;
    this.longitude = longitude;
    this.joinedRoomName = null;
    this.canReceive = false;
  }

  updateJoinedRoomName(roomName) {
    this.joinedRoomName = roomName;
  }

  getJoinedRoomName() {
    return this.joinedRoomName;
  }
}

module.exports.User = User;
