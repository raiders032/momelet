class Room {
  constructor(roomName, hostSocketId) {
    this.roomName = roomName;
    this.hostSocketId = hostSocketId;
    this.headCount = 0;
    this.userList = new Array();
    this.isStarted = false;
    this.maxHeadCount = 8;
  }

  addUser = (user) => {
    if (this.headCount >= this.maxHeadCount) return false;

    this.userList.push(user.socketId, user);
    this.headCount++;
    return true;
  };

  deleteUser = (user) => {
    this.userList.forEach((value, index) => {
      if (this.userList.length <= 0)
        throw new Error("방 인원이 0명 이므로 삭제할 수 없습니다.");

      //유저 리스트에서 삭제 할 유저 찾아서 삭제하기
      if (user.socketId === value.socketId) {
        this.userList.splice(index, 1);
        this.headCount--;
      }

      //만약 방장이라면 유저 리스트의 첫번째 유저를 방장으로 설정
      if (this.headCount > 0 && user.socketId === this.hostSocketId) {
        this.hostSocketId = this.userList[0].socketId;
      }

      if (this.headCount <= 0) return true;
      else return false;
    });
  };

  startGame = () => {
    this.isStarted = true;
  };
}
