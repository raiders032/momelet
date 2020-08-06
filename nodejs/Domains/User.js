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
    this.connectedRoomName = null;
  }

  setConnectedRoomName = (roomName) => {
    try {
      this.connectedRoomName = roomName;
      return true;
    } catch (e) {
      console.log(
        "ERROR: User class' method setConnectedRoomName error. Return false."
      );
      return false;
    }
  };

  getConnectedRoomName = () => {
    return this.connectedRoomName;
  };
}

module.exports.User = User;
