import React, { useState, useEffect } from "react";
import { View } from "react-native";
import WaitingRoomForStartPresenter from "./WaitingRoomForStartPresenter";
import socket from "../../../socket";

export default ({ navigation, route }) => {
  const [users, setUsers] = useState(
    JSON.parse(route.params.msg)["gameRoomUserList"]
  );
  useEffect(() => {
    socket.on("gameRoomUpdate", (msg) => {
      setUsers(JSON.parse(msg).gameRoomUserList);
    });
  }, []);

  return <WaitingRoomForStartPresenter users={users} />;
};
