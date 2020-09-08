import axios from "axios";
import * as SingleObject from "../../SingleObjects.js";
import logger from "../../logger.js";
import SocketResponse from "../../socketResponse.js";

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
    } = await axios.get(process.env.SERVER_URL + "/api/v1/restaurants7", {
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

const rollBackRoom = (room) => {
  room.endGame();
  room.clearCardList();
};

export default async (socket, msg) => {
  let response = new SocketResponse();
  let data = {};
  let id, roomName, radius, latitude, longitude, room, cards;
  var echo = "gameStart. msg: " + msg;
  logger.info(echo);

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
    response.isFail("json.parse");
    return JSON.stringify(response);
  }

  room = SingleObject.RoomRepository.findByRoomName(roomName);
  if (!canStart(room, id)) {
    response.isFail("room.game.start");
    return JSON.stringify(response);
  }

  // 방정보가 업데이트 되기 시작
  // 오류가 생기면 롤백해야함.
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
    rollBackRoom(room);
    logger.error("getCard error: " + err);
    response.isFail("game.card.get");
    return JSON.stringify(response);
  }

  if (cards.length === 7) {
    for (let i = 0; i < 7; i++) {
      cardList.set(cards[i].id, { score: 0, like: 0 });
    }
    room.updateCardList(cardList);
  } else {
    response.isFail("game.card.notEnough");
    return JSON.stringify(response);
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
  data.restaurants = cards;
  response.isOk(data);
  let headCount = 0;
  users.forEach((user) => {
    if (user.getId() !== room.getHostId()) {
      socket.to(user.socketId).emit("gameStart", JSON.stringify(response));
    }
    // user.updateCanReceive(false);
    headCount++;
  });
  room.updateHeadCount(headCount);

  response.isOk({ restaurants: cards });
  return JSON.stringify(response);
};
