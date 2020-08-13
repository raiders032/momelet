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
    const { data } = await axios.get(
      process.env.DATA_STORAGE_URL + "api/v1/restaurants7",
      {
        headers: {
          Authorization: JWT,
        },
        params: {
          id,
          longitude,
          latitude,
          radius, // 전역 선언해둠
        },
      }
    );
    for (let i in data) {
      cards.push(data[i]);
    }
  } catch (err) {
    console.log("서버에서 카드 7장 가져오기 실패");
  }

  return cards;
};

const gameStartService = async (socket, msg) => {
  var echo = "gameStart 이벤트. 받은 msg: " + msg;
  console.log(echo);

  let retMsg = {
    status: "fail",
    restaurants: [],
  };

  const { id, roomName } = JSON.parse(msg);
  const room = SingleObject.RoomRepository.findByRoomName(roomName);

  // 에러 취약함. 처리해줘야 함.
  if (room !== false && room.getHostId() === id) {
    const users = room.getUserList();
    const cards = await getCard(users, id);
    if (cards.length === 7) {
      retMsg.status = "ok";
      for (let i = 0; i < 7; i++) {
        room.addCard(cards[i].id, { score: 0, like: 0 });
      }
    }
    retMsg.restaurants = cards;
    retMsg = JSON.stringify(retMsg);

    users
      .filter((user) => user.getCanReceive() && id !== user.id)
      .forEach((user) => {
        socket.to(user.socketId).emit("gameRoomUpdate"), retMsg;
      });

    room.startGame();
  }

  if (typeof retMsg !== "string") {
    retMsg.status = "no";
    retMsg = JSON.stringify(retMsg);
  }
  return retMsg;
};

module.exports = {
  gameStartService,
};
