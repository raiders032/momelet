import React, { useState } from "react";
import { StackActions } from "@react-navigation/native";
import GameRoomPresenter from "./GameRoomPresenter";
import socket from "../../../socket";

export default ({ navigation, route }) => {
  console.log("GameContainer Render");

  const restaurant = JSON.parse(route.params.msg);
  // console.log("restaurant: ", restaurant);

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
      userGameResult: gameResult.current,
      roomName: route.params.roomName,
    };

    socket.emit("gameUserFinish", JSON.stringify(sendMsg), (msg) => {
      console.log("gameUserFinishmsg", msg);

      restaurant.restaurants.forEach((element) =>
        console.log(element.id, element.name)
      );
      const newRestaurant = { ...restaurant };

      navigation.dispatch(
        StackActions.replace("WaitingRoomForResult", {
          msg: msg,
          restaurant: newRestaurant,
          userId: route.params.userId,
        })
      );
    });
  };
  return (
    <GameRoomPresenter
      restaurants={restaurant.restaurants}
      infoText={gameReadyAndMessage.message}
      zIndex={gameReadyAndMessage.isReady}
      gameFinish={gameFinish}
    />
  );
};
