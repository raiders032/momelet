const singleObject = require("../SingleObjects");

const findUserLocation = (lat, long) => {
  var aroundUser = [];
  var max_lat = lat + 0.0025;
  var min_lat = lat - 0.0025;
  var max_long = long + 0.0025;
  var min_long = long - 0.0025;
  app.userList.forEach((value, key) => {
    // 위도는 0.0025 경도는 0.0025 차이가 각각 약 250m, 240m 의 차이임
    // 그래서 500m 직사각형 정도
    if (
      value["latitude"] >= min_lat &&
      value["latitude"] <= max_lat &&
      value["longitude"] >= min_long &&
      value["longitude"] <= max_long
    ) {
      aroundUser.push({
        socketId: value["socketId"],
        name: value["name"],
        imageUril: value["imageUrl"],
      });
    }
  });

  return aroundUser;
};

module.exports = {
  findUserLocation,
};
