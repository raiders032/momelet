const axios = require("axios");
const SingleObject = require("../../SingleObjects");

const getCard = async () => {
  const cards = await axios.get(process.env.DATA_STORAGE_URL, {
    params: {

    }
  }); // array
};
const gameStartService = (socket, msg) => {
  var echo = "gameStart 이벤트. 받은 msg: " + msg;
  console.log(echo);

  let retMsg = {
    status: "fail",
    restaurants: [],
  };

  const { id, roomName } = JSON.parse(msg);
  const room = SingleObject.RoomRepository.findByRoomName(roomName);

  if (room !== false && room.getHostId() === id) {
    // 1. data fetch
    const cards = await getCard();
    // 2. update retMsg
    if(cards.legnth === 7){
      retMsg.status = "ok";
      retMsg.restaurants = cards;
    }
    // 3. JSON stringify retMsg
    retMsg = JSON.stringify(retMsg);
        
    const users = room.getUserList();
    users
      .filter((user) => user.getCanReceive() && id !== user.id)
      .forEach((user) => {
        socket.to(user.socketId).emit("gameRoomUpdate"), retMsg;
      });
  }
  return retMsg;
};

module.exports = {
  gameStartService,
};
