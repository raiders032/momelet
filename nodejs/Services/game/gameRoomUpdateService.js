const SingleObject = require("../../SingleObjects");

const gameRoomUpdateService = (socket, roomName, id) => {
  const findRoom = SingleObject.RoomRepository.findByRoomName(roomName);
  const users = findRoom.getUserList();

  users
    .filter((user) => user.canReceive() && id !== user.id)
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
