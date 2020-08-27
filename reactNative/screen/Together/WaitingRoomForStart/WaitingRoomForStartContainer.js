import React, { useState, useEffect } from "react";
import { View, TouchableOpacity, Text } from "react-native";
import WaitingRoomForStartPresenter from "./WaitingRoomForStartPresenter";
import socket from "../../../socket";

export default ({ navigation, route }) => {
  const msg = JSON.parse(route.params.msg);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={{ paddingRight: 10 }}
          onPress={() => {
            const sendMsg = { id: route.params.myId, roomName: msg.roomName };
            socket.emit("gameRoomLeave", JSON.stringify(sendMsg), (msg) => {});
            navigation.navigate("Main");
          }}
        >
          <Text>나가기</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  const [users, setUsers] = useState(msg.gameRoomUserList);
  const roomName = msg.roomName;
  const id = route.params.myId;
  useEffect(() => {
    socket.on("gameRoomUpdate", (msg) => {
      setUsers(JSON.parse(msg).gameRoomUserList);
    });
    socket.on("gameStart", (msg) => {
      console.log("onGameStartMessage", msg);
      navigation.navigate("GameRoom", {
        msg: msg,
        roomName: roomName,
        userId: id,
      });
    });
    // can't perform 에러 해결을 위한 코드
    // return () => {
    //   setUsers(null);
    // };
  }, []);
  const onClick = (latitude = 37.5447048, longitude = 127.0663154) => {
    socket.emit(
      "gameStart",
      JSON.stringify({
        id: msg.gameRoomUserList[0].id,
        roomName: msg.roomName,
        radius: 0.01,
        latitude: latitude,
        longitude: longitude,
      }),
      (msg) => {
        console.log("gameStart Message 보내기", msg);
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
