const axios = require("axios");
const SingleObject = require("../../SingleObjects");
const radius = 1;

const getCard = async (users, myId) => {
  let id = "";
  for (let i = 0; i < users.length; i++) {
    if (i === users.length - 1) {
      id += users[i].id;
    } else {
      id += users[i].id + ",";
    }
  }
  const { longitude, latitude, JWT } = SingleObject.UserRepository.findById(
    myId
  );

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
        radius, // 전역 선언해둠
      },
    });

    for (let i in restaurants) {
      cards.push(restaurants[i]);
    }
  } catch (err) {
    console.log("데이타 fetch 오류");
    throw err;
  }

  return cards;
};

const gameStartService = async (socket, msg) => {
  var echo = "gameStart 이벤트. 받은 msg: " + msg;
  console.log(echo);

  let retMsg = {
    status: "fail",
    restaurants: null,
  };

  const { id, roomName } = JSON.parse(msg);
  const room = SingleObject.RoomRepository.findByRoomName(roomName);

  // 에러 취약함. 처리해줘야 함.
  if (room !== false && !room.getIsStarted() && room.getHostId() === id) {
    // lock 역할로 room.isStarted를 사용
    room.startGame();
    const users = room.getUserList();

    try {
      const cards = await getCard(
        users.filter((user) => user.getCanReceive()),
        id
      );
      if (cards.length === 7) {
        retMsg.status = "ok";
        for (let i = 0; i < 7; i++) {
          room.addCard(cards[i].id, { score: 0, like: 0 });
        }
      } else {
        throw new Error("카드가 7장이 아님");
      }
      retMsg.restaurants = cards;
      retMsg = JSON.stringify(retMsg);

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
      // 유저들의 canReceive를 false로 업데이트 해준다.
      // canReceive가 false인 유저는 방에서 삭제되었기 때문에 filter를 쓰지 않음.
      let headCount = 0;
      users.forEach((user) => {
        if (user.getId() !== room.getHostId()) {
          socket.to(user.socketId).emit("gameStart", retMsg);
        }
        user.updateCanReceive(false);
        headCount++;
      });
      room.updateHeadCount(headCount);
    } catch (err) {
      console.log(err);
      console.log("카드 가져오기 실패 / 게임시작 실패");

      retMsg.status = "fail";
      retMsg = JSON.stringify(retMsg);
      room.endGame();
    }
  } else {
    retMsg.status = "no";
    retMsg = JSON.stringify(retMsg);
  }
  return retMsg;
};

module.exports = {
  gameStartService,
};
