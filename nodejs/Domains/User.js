export default class User {
  constructor(socket, { id, email, name, imageUrl, JWT, latitude, longitude }) {
    this.socket = socket;
    // this.socketId = socket.id;
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

  getJoinedRoomName() {
    return this.joinedRoomName;
  }

  updateJoinedRoomName(roomName) {
    this.joinedRoomName = roomName;
  }

  getCanReceive() {
    return this.canReceive;
  }

  updateCanReceive(canReceive) {
    this.canReceive = canReceive;
  }

  getId() {
    return this.id;
  }

  getName() {
    return this.name;
  }
}
