import logger from "../../logger.js";
import * as SingleObject from "../../SingleObjects.js";
import SocketResponse from "../../SocketResponse.js";
import roomLeave from "../util/roomLeave.js";

export default (socket, { id, roomName }) => {
  let response = new SocketResponse();

  logger.info("받은 roomName: " + roomName);

  let user, room;
  user = SingleObject.UserRepository.findById(id);
  room = SingleObject.RoomRepository.findByRoomName(roomName);

  logger.info("gameRoomLeave에서 찾은 room: " + room);

  roomLeave(user, room);

  response.isOk(null);
  return response;
};

// eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiI5IiwidHlwZSI6ImFjY2VzcyIsImlhdCI6MTYwMDQxMjQ3OSwiZXhwIjoxNjAwNDE2MDc5fQ.cZCnaDEj4m8BZPcGNwtxV78VU10rE7zPDEJte-Thhwpea-F17wdSG7fUBxGVii9i4SwP8fJLXNZu_X5u5YGEYA
