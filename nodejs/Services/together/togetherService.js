import * as SingleObject from "../../SingleObjects.js";
import logger from "../../logger.js";
import SocketResponse from "../../socketResponse.js";

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
export default (socket, msg) => {
  let response = new SocketResponse();
  let data = { aroundUsers: null };
  var echo = "together. msg: " + msg;
  logger.info(echo);
  try {
    const { id, latitude, longitude } = JSON.parse(msg);
    data.aroundUsers = findAroundUsers(id, latitude, longitude);
    response.isOk(data);
  } catch (err) {
    logger.error("togetherService error: " + err);
    response.isFail("together.error");
  }
  return JSON.stringify(response);
};
