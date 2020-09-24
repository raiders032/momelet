import * as SingleObject from "../../SingleObjects.js";
import SocketResponse from "../../SocketResponse.js";
import { ERR_ROOM_NOT_FOUND } from "../../Errors/RepositoryError.js";
import {
  ERR_GAME_ALREADY_STARTED,
  ERR_HOST_NOT_CORRECT,
} from "../../Errors/GameError.js";
import getRestaurantCard from "../util/getRestaurantCard.js";

const checkCanStart = (room, id) => {
  if (room === false) throw new ERR_ROOM_NOT_FOUND();
  if (room.getIsStarted() === true) throw new ERR_GAME_ALREADY_STARTED();
  if (room.getHostId() !== id) throw new ERR_HOST_NOT_CORRECT();
  return true;
};

const rollBackRoom = (room) => {
  room.endGame();
  room.clearCardList();
};

export default async (
  socket,
  { id, roomName, radius, latitude, longitude, jwt }
) => {
  let response = new SocketResponse();
  let data = {};

  let room;
  room = SingleObject.RoomRepository.findByRoomName(roomName);
  checkCanStart(room, id);

  // 방정보가 업데이트 되기 시작
  // 오류가 생기면 롤백해야함.
  let cards;
  room.startGame();
  const users = room.getUserList();
  try {
    cards = await getRestaurantCard(
      users.filter((user) => user.getCanReceive()),
      radius,
      latitude,
      longitude,
      jwt
    );
  } catch (err) {
    rollBackRoom(room);
    throw err;
  }

  let cardList = new Map();
  for (let i = 0; i < 7; i++) {
    cardList.set(cards[i].id, { score: 0, liking: 0 });
  }
  room.updateCardList(cardList);

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
      socket.to(user.socket.id).emit("gameStart", JSON.stringify(response));
    }
    headCount++;
  });
  room.updateHeadCount(headCount);

  return response;
};
