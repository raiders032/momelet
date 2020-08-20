import React, { useState } from "react";
import InvitePresenter from "./InvitePresenter";
import socket from "../../../socket";
export default ({ navigation, route }) => {
  const tmpUsers = JSON.parse(route.params.msg).aroundUsers;
  const [users, setUsers] = useState(
    tmpUsers.map((user) => {
      return { ...user, selected: false };
    })
  );
  const onClick = () => {
    const result = [];
    users.forEach((user) => {
      if (user.selected) {
        result.push(user.socketId);
      }
    });

    socket.emit(
      "togetherInvite",
      JSON.stringify({
        id: route.params.user.id,
        inviteTheseUsers: result,
      }),
      (msg) => {
        navigation.navigate("WaitingRoomForStart", { msg });
      }
    );
  };
  return (
    <InvitePresenter users={users} setUsers={setUsers} onClick={onClick} />
  );
};
