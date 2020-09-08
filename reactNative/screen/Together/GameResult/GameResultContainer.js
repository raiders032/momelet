import React, { useEffect } from "react";
import GameResultPresenter from "./GameResultPresenter";
import { StackActions } from "@react-navigation/native";
import socket from "../../../socket";

export default ({ navigation, route }) => {
  // useEffect(() => {
  //   return () => {
  //     const sendMsg = {
  //       id: route.params.userId,
  //       roomName: route.params.roomName,
  //     };
  //     // console.log(sendMsg);
  //     socket.emit("gameRoomLeave", JSON.stringify(sendMsg), (msg) => {
  //       console.log("leavemsg", msg);
  //     });
  //   };
  // }, []);
  const msg = JSON.parse(route.params.msg);
  // console.log(route.params);
  const resultId = msg.roomGameResult.id;
  console.log("resultId: ", resultId);

  const result = route.params.restaurant.restaurants.filter((restaurant) => {
    console.log(restaurant.id);
    return restaurant.id == resultId;
  });
  // console.log("result: ", result);
  const onClick = () => {
    const sendMsg = {
      id: route.params.userId,
      roomName: route.params.roomName,
    };
    // console.log(sendMsg);
    socket.emit("gameRoomLeave", JSON.stringify(sendMsg), (msg) => {
      console.log("leavemsg", msg);
    });
    navigation.navigate("Main");
  };
  const footerClick = () => {
    const sendMsg = {
      id: route.params.userId,
      roomName: route.params.roomName,
    };
    socket.emit("gameRoomJoinAgain", JSON.stringify(sendMsg), (msg) => {
      console.log("msgWhenGameRoomJoinAgain: ", msg);
      const newMsg = {
        ...JSON.parse(msg),
        roomName: route.params.roomName,
      };

      console.log("newMsg: ", newMsg);
      navigation.dispatch(
        StackActions.replace("WaitingRoomForStart", {
          msg: JSON.stringify(newMsg),
          myId: route.params.userId,
        })
      );
    });
  };
  return (
    <GameResultPresenter
      result={result[0]}
      total={msg.roomGameResult.headCount}
      selected={msg.roomGameResult.likeCount}
      onClick={onClick}
      footerClick={footerClick}
    />
  );
};
