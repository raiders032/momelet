export default class Room {
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
    if (this.isStarted || this.headCount >= this.maxHeadCount) {
      throw "Can't join the room";
    }
    user.updateCanReceive(true);
    this.userList.push(user);
    this.headCount++;
  }

  deleteUser(user) {
    if (this.userList.length <= 0)
      throw new Error("방 인원이 0명 이므로 삭제할 수 없습니다.");
    this.userList.forEach((value, index) => {
      //유저 리스트에서 삭제 할 유저 찾아서 삭제하기
      if (user === value) {
        this.userList.splice(index, 1);
        this.headCount--;
        //만약 방장이라면 유저 리스트의 첫번째 유저를 방장으로 설정
        if (this.headCount > 0 && user.id === this.hostId) {
          this.hostId = this.userList[0].id;
        }
      }
    });

    return this.headCount;
  }

  updateCardList(cardList) {
    this.clearCardList();
    this.cardList = cardList;
  }

  clearCardList() {
    this.cardList.clear();
  }

  addScore(id, like) {
    const card = this.cardList.get(id);
    if (like === "y") {
      card.like += 1;
      card.score += 2;
    } else if (like === "n") {
      card.score += 0;
    } else if (like === "s") {
      card.score += 1;
    }
  }

  getUserInfo() {
    let userInfo = [];
    this.userList.forEach((user) => {
      const { id, name, imageUrl } = user;
      userInfo.push({
        id,
        name,
        imageUrl,
      });
    });
    return userInfo;
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

  getCardList() {
    return this.cardList;
  }

  getFinishCount() {
    return this.finishCount;
  }

  getIsStarted() {
    return this.isStarted;
  }

  addFinishCount() {
    return ++this.finishCount;
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

  updateHostId(hostId) {
    return (this.hostId = hostId);
  }

  resetFinishCount(finishCount) {
    return (this.finishCount = 0);
  }

  findUserById(userId) {
    for (let user of this.userList) {
      if (user.getId() === userId) return true;
    }
    return false;
  }
}
