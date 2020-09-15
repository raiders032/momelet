import * as SingleObject from "../../SingleObjects.js";
import logger from "../../logger.js";

export default (socket) => {
  // 클래스의 프로퍼티에 직접 접근하고 있음
  console.log("소켓: " + socket.toString());
  console.log("소켓쩜아이디: " + socket.id);
  const user = SingleObject.UserRepository.findBySocketId(socket.id);
  if (user.joinedRoomName !== null) {
    SingleObject.RoomRepository.findByRoomName(user.joinedRoomName).deleteUser(
      user
    );
  }
  SingleObject.UserRepository.delete(user.socketId);

  // 출력용 문구. 후에 삭제 필요함.
  const userList = SingleObject.UserRepository.findAll().map((user) => user.id);
  logger.info("a user disconnected. userList: (" + userList + ")");
};
