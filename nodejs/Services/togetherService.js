const SingleObject = require("../SingleObjects");

const findUserLocation = (socketId, lat, long) => {
  const aroundUser = [];
  const max_lat = lat + 0.0025;
  const min_lat = lat - 0.0025;
  const max_long = long + 0.0025;
  const min_long = long - 0.0025;
  // SingleObject.userLists.forEach((value, key) => {
  //   // 위도는 0.0025 경도는 0.0025 차이가 각각 약 250m, 240m 의 차이임
  //   // 그래서 500m 직사각형 정도
  //   if (socketId !== key) {
  //     if (
  //       value["latitude"] >= min_lat &&
  //       value["latitude"] <= max_lat &&
  //       value["longitude"] >= min_long &&
  //       value["longitude"] <= max_long
  //     ) {
  //       aroundUser.push({
  //         socketId: value["socketId"],
  //         name: value["name"],
  //         imageUrl: value["imageUrl"],
  //       });
  //     }
  //   }
  // });

  for (let key of SingleObject.Users.canPlayGameUsers) {
    const user = SingleObject.Users.connectedUsers.get(key);

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
