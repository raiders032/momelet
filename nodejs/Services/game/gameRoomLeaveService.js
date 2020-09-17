import * as SingleObject from "../../SingleObjects.js";
import SocketResponse from "../../SocketResponse.js";
import roomLeave from "../util/roomLeave.js";

export default (socket, { id, roomName }) => {
  let response = new SocketResponse();

  let user, room;
  user = SingleObject.UserRepository.findById(id);
  room = SingleObject.RoomRepository.findByRoomName(roomName);
  roomLeave(user, room);

  response.isOk(null);
  return response;
};
