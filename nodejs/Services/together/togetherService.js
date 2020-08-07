const SingleObject = require("../../SingleObjects");

const findAroundUsers = (mySocketId, lat, long) => {
  const aroundUsers = [];
  const max_lat = lat + 0.0025;
  const min_lat = lat - 0.0025;
  const max_long = long + 0.0025;
  const min_long = long - 0.0025;

  // 클래스의 프로퍼티에 직접접근하고 있음
  for (let socketId of SingleObject.UserList.canPlayGameUserList) {
    const aroundUser = SingleObject.UserList.connectedUserList.get(socketId);

    if (mySocketId !== socketId) {
      if (
        aroundUser["latitude"] >= min_lat &&
        aroundUser["latitude"] <= max_lat &&
        aroundUser["longitude"] >= min_long &&
        aroundUser["longitude"] <= max_long
      ) {
        aroundUsers.push({
          socketId: aroundUser["socketId"],
          name: aroundUser["name"],
          imageUrl: aroundUser["imageUrl"],
        });
      }
    }
  }
  return aroundUsers;
};

// 같이하기
const togetherService = (socket, msg) => {
  var echo = "together 이벤트. 받은 msg: " + msg;
  console.log(echo);

  // 수정되어야 하는 부분. 이제 msg의 형식을 JSON으로 통일할 예정이기 때문
  // const msgSplit = msg.split(" ");
  // const latitude = msgSplit[0];
  // const longitude = msgSplit[1];

  // 테스팅용. index.html 의 형식에 맞춤.
  const latitude = msg[0];
  const longitude = msg[1];

  const aroundUsers = findAroundUsers(socket.id, latitude, longitude);

  const ret = JSON.stringify({ aroundUsers });
  return ret;
};

module.exports = {
  togetherService,
};
