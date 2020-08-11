const SingleObject = require("../../SingleObjects");

const findAroundUsers = (myId, lat, long) => {
  const aroundUsers = [];
  const max_lat = Number(lat) + 0.0025;
  const min_lat = Number(lat) - 0.0025;
  const max_long = Number(long) + 0.0025;
  const min_long = Number(long) - 0.0025;

  // 클래스의 프로퍼티에 직접접근하고 있음
  for (let user of SingleObject.UserRepository.findAll()) {
    if (myId !== user.id) {
      if (
        user["latitude"] >= min_lat &&
        user["latitude"] <= max_lat &&
        user["longitude"] >= min_long &&
        user["longitude"] <= max_long
      ) {
        console.log("이 유저 추가요!: " + user["id"]);
        aroundUsers.push({
          id: user["id"],
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

    const ret = JSON.stringify({ aroundUsers });
    return ret;
  } catch (e) {
    return echo;
  }
};

module.exports = {
  togetherService,
};
