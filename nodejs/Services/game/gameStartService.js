const axios = require("axios");
const SingleObject = require("../../SingleObjects");
const { logger } = require("../../logger");

const canStart = (room, id) => {
  if (room === false) {
    return false;
  }
  // lock 역할로 isStarted 활용
  if (room.getIsStarted() === true) {
    return false;
  }
  if (room.getHostId() !== id) {
    return false;
  }
  return true;
};

const getCard = async (users, myId, radius, latitude, longitude) => {
  let id = "";
  for (let i = 0; i < users.length; i++) {
    if (i === users.length - 1) {
      id += users[i].id;
    } else {
      id += users[i].id + ",";
    }
  }
  const { JWT } = SingleObject.UserRepository.findById(myId);

  const cards = [];
  try {
    const {
      data: {
        data: { restaurants },
      },
    } = await axios.get(process.env.DATA_STORAGE_URL + "api/v1/restaurants7", {
      headers: {
        Authorization: "Bearer " + JWT,
      },
      params: {
        id,
        longitude,
        latitude,
        radius,
      },
    });
    for (let i in restaurants) {
      cards.push(restaurants[i]);
    }
  } catch (err) {
    logger.error("카드 7장 가져오는 데이터 fetch하던 중에 오류");
    throw err;
  }
  return cards;
};

const gameStartService = async (socket, msg) => {
  var echo = "gameStart. msg: " + msg;
  logger.info(echo);

  let retMsg = {
    status: "fail",
    restaurants: null,
  };

  let id, roomName, radius, latitude, longitude, room, cards;
  try {
    const parsedMsg = JSON.parse(msg);
    id = parsedMsg.id;
    roomName = parsedMsg.roomName;
    radius = parsedMsg.radius;
    latitude = parsedMsg.latitude;
    longitude = parsedMsg.longitude;
    room = parsedMsg.room;
  } catch (err) {
    logger.error("gameStartService Msg parse error: " + err);
    return JSON.stringify(retMsg);
  }

  room = SingleObject.RoomRepository.findByRoomName(roomName);
  if (!canStart(room, id)) {
    retMsg.status = "no";
    return JSON.stringify(retMsg);
  }

  room.startGame();
  const users = room.getUserList();
  try {
    cards = await getCard(
      users.filter((user) => user.getCanReceive()),
      id,
      radius,
      latitude,
      longitude
    );
  } catch (err) {
    logger.error("getCard error: " + err);
    return JSON.stringify(retMsg);
  }

  if (cards.length === 7) {
    retMsg.status = "ok";
    retMsg.restaurants = cards;
    for (let i = 0; i < 7; i++) {
      room.addCard(cards[i].id, { score: 0, like: 0 });
    }
  } else {
    return JSON.stringify(retMsg);
  }

  // room.userList가 Array이기 때문에 순회하며 delete를 할 수 없음
  // 따라서 userList에서 삭제될 유저만 Array로 새로 만들어서 삭제를 진행함.
  const leaveUsers = users.filter((user) => !user.getCanReceive());
  leaveUsers.forEach((user) => {
    SingleObject.RoomRepository.findByRoomName(
      user.getJoinedRoomName()
    ).deleteUser(user);
    user.updateJoinedRoomName(null);
  });

  // 게임이 시작된 후에 gameRoomUpdate, gameStart에 대해서 메시지를 보낼 일이 없기에
  // 유저들의 canReceive를 false로 업데이트 해준다. 0903 gameUserFinish에서 변경할 예정
  // canReceive가 false인 유저는 방에서 삭제되었기 때문에 filter를 쓰지 않음.
  retMsg = JSON.stringify(retMsg);
  let headCount = 0;
  users.forEach((user) => {
    if (user.getId() !== room.getHostId()) {
      socket.to(user.socketId).emit("gameStart", retMsg);
    }
    // user.updateCanReceive(false);
    headCount++;
  });
  room.updateHeadCount(headCount);

  return retMsg;
};

module.exports = {
  gameStartService,
};
