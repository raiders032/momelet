const SingleObject = require("../../SingleObjects");

const gameRoomUpdateService = (socket, roomName, id) => {
  const room = SingleObject.RoomRepository.findByRoomName(roomName);
  const users = room.getUserList();

  users
    .filter((user) => user.getCanReceive() && id !== user.id)
    .forEach((user) => {
      socket.to(user.socketId).emit(
        "gameRoomUpdate",
        JSON.stringify({
          gameRoomUserList: room.getUserList().map((user) => {
            const { id, name, imageUrl } = user;
            const userDto = { id, name, imageUrl };
            return userDto;
          }),
          hostId: room.getHostId(),
        })
      );
    });
};

module.exports = {
  gameRoomUpdateService,
};
