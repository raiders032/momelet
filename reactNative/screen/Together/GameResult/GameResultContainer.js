import React, { useEffect } from "react";
import GameResultPresenter from "./GameResultPresenter";
import socket from "../../../socket";
export default ({ navigation, route }) => {
  console.log("abc", route.params.userId);

  useEffect(() => {
    return () => {
      const sendMsg = {
        id: route.params.userId,
        roomName: route.params.roomName,
      };
      // console.log(sendMsg);
      socket.emit("gameRoomLeave", JSON.stringify(sendMsg), (msg) => {
        console.log("leavemsg", msg);
      });
    };
  }, []);
  const msg = JSON.parse(route.params.msg);
  // console.log(route.params);
  const resultId = msg.roomGameResult.id;
  const result = route.params.restaurant.restaurants.filter(
    (restaurant) => restaurant.id == resultId
  );
  const onClick = () => {
    navigation.navigate("Main");
  };
  return (
    <GameResultPresenter
      result={result[0]}
      total={msg.roomGameResult.headCount}
      selected={msg.roomGameResult.likeCount}
      onClick={onClick}
    />
  );
};
