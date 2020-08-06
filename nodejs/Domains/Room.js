const moment = require("moment");
require("moment-timezone");
moment.tz.setDefault("Asia/Seoul");

class Room {
  constructor(roomName, hostSocketId) {
    this.roomName = roomName;
    this.hostSocketId = hostSocketId;
    this.createdDate = moment().format("YYYY-MM-DD HH:mm:ss");
    this.headCount = 0;
    this.userList = new Map();
    this.isStarted = false;
    this.maxHeadCount = 8;
  }

  addUser = (user) => {
    if (this.headCount >= this.maxHeadCount)
      throw new Error("방 접속 가능 인원이 초과되었습니다.");
    this.userList.set(user.socketId, user);
    this.headCount++;
  };

  deleteUser = (user) => {
    this.userList.delete(user.socketId);
    this.headCount--;

    //미완성
    if (user.socketId === this.hostSocketId && this.headCount > 0) {
      this.hostSocketId = this.userList.entries.next().socketId;
      this.roomName = this.hostSocketId + "_room";
      this.userList.forEach((user, socketId) => {});
    }
  };

  startGame = () => {
    this.isStarted = true;
  };
}
