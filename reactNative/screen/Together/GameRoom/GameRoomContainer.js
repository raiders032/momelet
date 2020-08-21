import React, { useState } from "react";
import { StackActions } from "@react-navigation/native";
import GameRoomPresenter from "./GameRoomPresenter";
import socket from "../../../socket";

export default ({ navigation, route }) => {
  console.log("GameContainer Render");

  const restaurant = JSON.parse(route.params.msg);

  const [gameReadyAndMessage, setGameReadyAndMessage] = useState({
    isReady: 1,
    message: "준비~",
  });
  if (gameReadyAndMessage.isReady == 1) {
    setTimeout(() => {
      setGameReadyAndMessage({ isReady: 0, message: "시작!" });
    }, 1000);
  } else if (gameReadyAndMessage.isReady == 0) {
    setTimeout(() => {
      setGameReadyAndMessage({ isReady: -1, message: "0" });
    }, 500);
  }
  const gameFinish = (gameResult) => {
    const sendMsg = {
      id: route.params.userId,
      userGameResult: gameResult,
      roomName: route.params.roomName,
    };

    socket.emit("gameUserFinish", JSON.stringify(sendMsg), (msg) => {
      navigation.navigate("WaitingRoomForResult", { msg: msg });
    });
  };
  return (
    <GameRoomPresenter
      restaurants={restaurant}
      infoText={gameReadyAndMessage.message}
      zIndex={gameReadyAndMessage.isReady}
      gameFinish={gameFinish}
    />
  );
};
