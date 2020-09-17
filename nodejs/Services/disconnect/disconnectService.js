import * as SingleObject from "../../SingleObjects.js";
import logger from "../../logger.js";
import roomLeave from "../util/roomLeave.js";

export default (socket) => {
  // 클래스의 프로퍼티에 직접 접근하고 있음
  const user = SingleObject.UserRepository.findBySocketId(socket.id);

  try {
    if (user.joinedRoomName !== null) {
      roomLeave(
        user,
        SingleObject.RoomRepository.findByRoomName(user.joinedRoomName)
      );
    }
  } catch (err) {
    logger.error(err.stack);
  }

  SingleObject.UserRepository.delete(user.socket.id);

  // 출력용 문구. 후에 삭제 필요함.
  const userList = SingleObject.UserRepository.findAll().map((user) => user.id);
  logger.info("a user disconnected. userList: (" + userList + ")");
};
