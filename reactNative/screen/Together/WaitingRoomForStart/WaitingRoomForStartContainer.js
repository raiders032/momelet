import React, { useState, useEffect } from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { StackActions } from "@react-navigation/native";

import WaitingRoomForStartPresenter from "./WaitingRoomForStartPresenter";
import socket from "../../../socket";

export default ({ navigation, route }) => {
  const msg = JSON.parse(route.params.msg);

  console.log(
    "내가 호스트가 될 상인가?",
    msg.hostId,
    msg.hostId === route.params.myId
  );
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
      navigation.dispatch(
        StackActions.replace("GameRoom", {
          msg: msg,
          roomName: roomName,
          userId: id,
        })
      );
    });
    // can't perform 에러 해결을 위한 코드
    // return () => {
    //   setUsers(null);
    // };
  }, []);
  const onClick = (latitude = 37.5447048, longitude = 127.0663154) => {
    const sendMsg = {
      id: msg.gameRoomUserList[0].id,
      roomName: msg.roomName,
      radius: 0.01,
      latitude: latitude,
      longitude: longitude,
    };
    console.log(sendMsg);
    const stringifiedMsg = JSON.stringify(sendMsg);
    console.log(stringifiedMsg);
    socket.emit(
      "gameStart",
      JSON.stringify({
        id: route.params.myId,
        roomName: msg.roomName,
        radius: 0.01,
        latitude: latitude,
        longitude: longitude,
      }),
      (msg) => {
        navigation.dispatch(
          StackActions.replace("GameRoom", {
            msg: msg,
            roomName: roomName,
            userId: id,
          })
        );
      }
    );
  };
  return (
    <WaitingRoomForStartPresenter
      users={users}
      onClick={onClick}
      activation={msg.hostId === route.params.myId}
    />
  );
};
