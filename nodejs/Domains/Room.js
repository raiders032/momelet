class Room {
  constructor(roomName, userId) {
    this.roomName = roomName;
    this.hostId = userId;
    this.headCount = 0;
    this.userList = new Array();
    this.isStarted = false;
    this.maxHeadCount = 8;
  }

  addUser(user) {
    if (this.headCount >= this.maxHeadCount) return false;
    this.userList.push(user);
    this.headCount++;
    return true;
  }

  deleteUser(user) {
    if (this.userList.length <= 0)
      throw new Error("방 인원이 0명 이므로 삭제할 수 없습니다.");
    this.userList.forEach((value, index) => {
      //유저 리스트에서 삭제 할 유저 찾아서 삭제하기
      if (user === value) {
        this.userList.splice(index, 1);
        this.headCount--;
      }

      //만약 방장이라면 유저 리스트의 첫번째 유저를 방장으로 설정
      if (this.headCount > 0 && user.id === this.hostId) {
        this.hostId = this.userList[0].id;
      }

      if (this.headCount <= 0) return true;
      else return false;
    });
  }

  startGame() {
    this.isStarted = true;
  }

  getUserList() {
    return this.userList;
  }

  getRoomName() {
    return this.roomName;
  }

  getHostId() {
    return this.hostId;
  }

  isStarted() {
    return this.isStarted;
  }
}

module.exports = Room;
