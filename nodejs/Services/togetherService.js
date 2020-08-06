const SingleObject = require("../SingleObjects");

const findUserLocation = (socketId, lat, long) => {
  const aroundUser = [];
  const max_lat = lat + 0.0025;
  const min_lat = lat - 0.0025;
  const max_long = long + 0.0025;
  const min_long = long - 0.0025;

  // 클래스의 프로퍼티에 직접접근하고 있음
  for (let key of SingleObject.UserList.canPlayGameUserList) {
    const user = SingleObject.UserList.connectedUserList.get(key);

    if (socketId !== key) {
      if (
        user["latitude"] >= min_lat &&
        user["latitude"] <= max_lat &&
        user["longitude"] >= min_long &&
        user["longitude"] <= max_long
      ) {
        aroundUser.push({
          socketId: user["socketId"],
          name: user["name"],
          imageUrl: user["imageUrl"],
        });
      }
    }
  }
  return aroundUser;
};

// 같이하기
const togetherService = (socket, msg) => {
  var echo = "together 이벤트. 받은 msg: " + msg;
  console.log(echo);
  const msgSplit = msg.split(" ");
  const latitude = msgSplit[0];
  const longitude = msgSplit[1];

  const aroundUser = findUserLocation(socket.id, latitude, longitude);

  return aroundUser;
};

module.exports = {
  togetherService,
};
