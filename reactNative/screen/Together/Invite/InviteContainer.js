import React, { useState } from "react";
import { StackActions } from "@react-navigation/native";

import InvitePresenter from "./InvitePresenter";
import socket from "../../../socket";
export default ({ navigation, route }) => {
  const tmpUsers = JSON.parse(route.params.msg).aroundUsers;

  console.log("tmpUsers: ", tmpUsers);
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
    console.log(result);
    socket.emit(
      "togetherInvite",
      JSON.stringify({
        id: route.params.user.id,
        inviteTheseUsers: result,
      }),
      (msg) => {
        navigation.dispatch(
          StackActions.replace("WaitingRoomForStart", {
            msg,
            myId: route.params.user.id,
          })
        );
      }
    );
  };
  return (
    <InvitePresenter users={users} setUsers={setUsers} onClick={onClick} />
  );
};
