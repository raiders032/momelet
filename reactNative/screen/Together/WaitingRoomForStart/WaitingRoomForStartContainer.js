import React, { useState, useEffect } from "react";
import { View } from "react-native";
import WaitingRoomForStartPresenter from "./WaitingRoomForStartPresenter";
import socket from "../../../socket";

export default ({ navigation, route }) => {
  const msg = JSON.parse(route.params.msg);

  const [users, setUsers] = useState(msg.gameRoomUserList);
  const roomName = msg.roomName;
  const id = msg.gameRoomUserList[0].id;
  useEffect(() => {
    socket.on("gameRoomUpdate", (msg) => {
      setUsers(JSON.parse(msg).gameRoomUserList);
    });
  }, []);
  const onClick = () => {
    console.log(msg.gameRoomUserList[0], msg.roomName);
    socket.emit(
      "gameStart",
      JSON.stringify({
        id: msg.gameRoomUserList[0].id,
        roomName: msg.roomName,
      }),
      (msg) => {
        console.log(msg);
        navigation.navigate("GameRoom", {
          msg: msg,
          roomName: roomName,
          userId: id,
        });
      }
    );
  };
  return <WaitingRoomForStartPresenter users={users} onClick={onClick} />;
};
