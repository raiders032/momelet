const axios = require("axios");
const SingleObject = require("../../SingleObjects");

const getCard = async (users, myId) => {
  let id = "";
  for (let i = 0; i < users.length; i++) {
    if (i === users.length - 1) {
      id += users[i].id;
    } else {
      id += users[i].id + ",";
    }
  }
  const { longitude, latitude } = SingleObject.UserRepository.findById(myId);
  const cards = await axios.get(
    process.env.DATA_STORAGE_URL + "api/v1/restaurants7",
    {
      params: {
        id,
        longitude,
        latitude,
        radius: 0.01,
      },
    }
  ); // array
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

  if (room !== false && room.getHostId() === id) {
    const users = room.getUserList();
    const cards = await getCard(users, id);
    if (cards.length === 7) retMsg.status = "ok";
    retMsg.restaurants = cards;
    retMsg = JSON.stringify(retMsg);

    users
      .filter((user) => user.getCanReceive() && id !== user.id)
      .forEach((user) => {
        socket.to(user.socketId).emit("gameRoomUpdate"), retMsg;
      });
  }

  if (typeof retMsg !== "string") {
    retMsg = JSON.stringify(retMsg);
  }
  return retMsg;
};

module.exports = {
  gameStartService,
};
