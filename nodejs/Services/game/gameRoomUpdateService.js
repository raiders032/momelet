import logger from "../../logger.js";
import SocketResponse from "../../SocketResponse.js";

export default (socket, room) => {
  logger.info("gameRoomUpdateService. roomName: " + room.getRoomName());

  let response = new SocketResponse();
  let data = {};

  data.gameRoomUserList = room
    .getUserList()
    .filter((user) => user.getCanReceive())
    .map((user) => {
      const { id, name, imageUrl } = user;
      return { id, name, imageUrl };
    });
  data.hostId = room.getHostId();
  response.isOk(data);

  socket
    .to(room.getRoomName())
    .emit("gameRoomUpdate", JSON.stringify(response));
  // users
  //   .filter((user) => user.getCanReceive() && id !== user.id)
  //   .forEach((user) => {
  //     socket
  //       .to(user.socket.id)
  //       .emit("gameRoomUpdate", JSON.stringify(response));
  //   });
};
