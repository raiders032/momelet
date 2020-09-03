import React, { useEffect, useState, useRef } from "react";
import { View, Text, Image, Animated, TouchableOpacity } from "react-native";
import { StackActions } from "@react-navigation/native";

import Basic from "../../component/Basic";
import Card from "../../component/Card";
import socket from "../../socket";
import Footer from "../../component/Footer";

export default ({ navigation, route }) => {
  const [dot, setDot] = useState(".");
  const rotateValue = useRef(new Animated.Value(0)).current;
  const init = () => {
    rotateValue.setValue(0);
    rotate();
  };
  const rotate = () => {
    Animated.timing(rotateValue, {
      toValue: 360,
      duration: 3000,
      useNativeDriver: true,
    }).start(init);
  };
  const rotateConfig = rotateValue.interpolate({
    inputRange: [0, 360],
    outputRange: ["0deg", "360deg"],
  });
  const dotConfig = rotateValue.interpolate({
    inputRange: [0, 360],
    outputRange: [1, 3],
  });
  const footer = (
    <Footer
      text={`기다리는중 ...`}
      style={{ backgroundColor: "white" }}
      // onClick={() => {
      //   socket.emit("tmpMsg2", "tmptmp");
      // }}
    />
  );
  useEffect(() => {
    rotate();

    socket.on("gameAllFinish", (msg) => {
      // console.log(msg);
      navigation.dispatch(
        StackActions.replace("GameResult", {
          msg: msg,
          restaurant: route.params.restaurant,
          roomName: JSON.parse(route.params.msg).roomName,
          userId: route.params.userId,
        })
      );
    });
    return () => {
      // socket.off("gameAllFinish");
    };
  }, []);
  return (
    <Basic footer={footer}>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Card>
          <Animated.View
            style={{
              width: "100%",
              height: "100%",
              justifyContent: "center",
              alignItems: "center",
              transform: [
                {
                  rotate: rotateConfig,
                },
              ],
            }}
          >
            <Image
              source={require("../../assets/momulet.png")}
              style={{ height: "30%", resizeMode: "contain" }}
            />
          </Animated.View>
        </Card>
      </View>
    </Basic>
  );
};
