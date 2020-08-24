const SingleObject = require("../../SingleObjects");

const findAroundUsers = (myId, lat, long) => {
  const aroundUsers = [];
  const max_lat = Number(lat) + 0.0025;
  const min_lat = Number(lat) - 0.0025;
  const max_long = Number(long) + 0.0025;
  const min_long = Number(long) - 0.0025;

  // 클래스의 프로퍼티에 직접접근하고 있음
  const users = SingleObject.UserRepository.findAll();
  for (let user of users) {
    if (myId !== user.id) {
      if (
        user["latitude"] >= min_lat &&
        user["latitude"] <= max_lat &&
        user["longitude"] >= min_long &&
        user["longitude"] <= max_long
      ) {
        aroundUsers.push({
          id: user["id"],
          socketId: user["socketId"],
          name: user["name"],
          imageUrl: user["imageUrl"],
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

  try {
    const { id, latitude, longitude } = JSON.parse(msg);
    const aroundUsers = findAroundUsers(id, latitude, longitude);

    const retMsg = JSON.stringify({ aroundUsers });
    return retMsg;
  } catch (e) {
    return echo;
  }
};

module.exports = {
  togetherService,
};
