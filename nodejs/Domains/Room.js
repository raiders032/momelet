class Room {
  constructor(roomName, userId) {
    this.roomName = roomName;
    this.hostId = userId;
    this.headCount = 0;
    this.finishCount = 0;
    this.userList = new Array();
    this.isStarted = false;
    this.maxHeadCount = 8;
    this.cardList = new Map();
  }

  addUser(user) {
    if (this.isStarted || this.headCount >= this.maxHeadCount) return false;
    user.updateCanReceive(true);
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
    });

    return this.headCount;
  }

  addCard(id, scores) {
    this.cardList.set(id, scores);
  }

  addScore(id, like) {
    const card = this.cardList.get(id);
    if (like === "y") {
      card.like += 1;
      card.score += 10;
    } else if (like === "n") {
      card.score -= 5;
    } else if (like === "s") {
      card.score += 5;
    }
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

  getHeadCount() {
    return this.headCount;
  }

  getFinishCount() {
    return this.finishCount;
  }

  getIsStarted() {
    return this.isStarted;
  }

  addFinish(userId) {
    const user = this.userList.get(userId);
    if (user.getCanReceive()) {
      user.updateCanReceive(false);
      return ++this.finishCount;
    }
    return this.finishCount;
  }
  startGame() {
    return (this.isStarted = true);
  }

  endGame() {
    return !(this.isStarted = false);
  }

  updateHeadCount(newHeadCount) {
    return (this.headCount = newHeadCount);
  }
}

module.exports = Room;
