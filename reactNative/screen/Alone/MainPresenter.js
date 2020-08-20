import React, { useRef, useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  PanResponder,
  Dimensions,
} from "react-native";
import Basic from "../../component/Basic";
import socket from "../../socket";
import Card from "../../component/Card";
import RestaurantCard from "../../component/RestaurantCard";
import { StackActions } from "@react-navigation/native";

const { width: WIDTH, height: HEIGHT } = Dimensions.get("window");

export default ({ restaurants, navigation, user }) => {
  const sendTogetherMessage = () => {
    socket.emit("together", "together msg from client", (msg) => {
      navigation.navigate("Together", { msg, user: user.data.userInfo });
      // navigation.dispatch(StackActions.replace("Together", { msg: msg }));
    });
  };
  const footer = (
    <View
      style={{
        justifyContent: "space-between",
        alignItems: "center",
        height: "100%",
        flexDirection: "row",
        padding: 20,
      }}
    >
      <TouchableOpacity onPress={sendTogetherMessage}>
        <Text style={{ fontFamily: "Godo" }}>같이하기</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Mypage");
        }}
      >
        <Text style={{ fontFamily: "Godo" }}>내 설정</Text>
      </TouchableOpacity>
    </View>
  );

  const [restaurant, setRestaurant] = useState(restaurants);
  const [firstRestaurant, secondRestaurant, ...otherRestaurant] = restaurant;

  const position = new Animated.ValueXY();

  const rotationValues = position.x.interpolate({
    inputRange: [-200, 0, 200],
    outputRange: ["-13deg", "0deg", "13deg"],
    extrapolate: "clamp",
  });
  const topPositionConfig = position.x.interpolate({
    inputRange: [-200, 0, 200],
    outputRange: [0, 10, 0],
    extrapolate: "clamp",
  });
  const scaleXPositionConfig = position.x.interpolate({
    inputRange: [-200, 0, 200],
    outputRange: [1, 0.95, 1],
    extrapolate: "clamp",
  });
  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: (evt, gestureState) => true,
    onPanResponderMove: (evt, { dx, dy }) => {
      position.setValue({ x: dx, y: dy });
    },
    onPanResponderRelease: (evt, { dx, dy }) => {
      if (dx >= 150) {
        Animated.timing(position, {
          toValue: {
            x: WIDTH + 50,
            y: dy,
          },
          duration: 200,
          useNativeDriver: false,
        }).start(() => {
          setRestaurant([secondRestaurant, ...otherRestaurant]);
        });
      } else if (dx <= -150) {
        Animated.timing(position, {
          toValue: {
            x: -WIDTH - 50,
            y: dy,
          },
          duration: 100,
          useNativeDriver: false,
        }).start(() => {
          setRestaurant([secondRestaurant, ...otherRestaurant]);
        });
      } else {
        Animated.spring(position, {
          toValue: {
            x: 0,
            y: 0,
          },
          useNativeDriver: false,
        }).start();
      }
    },
  });

  return (
    <Basic footer={footer}>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* <View
          style={{
            top: 10,
            width: "100%",
            height: "100%",
            justifyContent: "center",
            alignItems: "center",

            transform: [{ scaleX: 0.95 }],
          }}
          {...panResponder.panHandlers}
        >
          {otherRestaurant?.reverse().map((restaurant, idx) => (
            <RestaurantCard key={idx} restaurant={restaurant} />
          ))}
        </View> */}
        <Animated.View
          style={{
            top: topPositionConfig,
            width: "100%",
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
            position: "absolute",
            transform: [{ scaleX: scaleXPositionConfig }],
          }}
          {...panResponder.panHandlers}
        >
          {secondRestaurant ? (
            <RestaurantCard restaurant={secondRestaurant} />
          ) : (
            <View></View>
          )}
        </Animated.View>
        <Animated.View
          style={{
            width: "100%",
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
            position: "absolute",
            transform: [
              { rotate: rotationValues },
              ...position.getTranslateTransform(),
            ],
          }}
          {...panResponder.panHandlers}
        >
          {firstRestaurant ? (
            <RestaurantCard restaurant={firstRestaurant} />
          ) : (
            <View></View>
          )}
        </Animated.View>
        {/* <TouchableOpacity
          style={{ zIndex: zIdx, width: "100%", height: "100%" }}
          activeOpacity={1}
          onPress={() => {
            console.log("f");
            setZIdx(-1);
          }}
        >
          <View
            style={{
              width: "100%",
              height: "100%",
              backgroundColor: "grey",
              justifyContent: "center",
              alignItems: "center",
              opacity: 0.8,
            }}
          ></View>
        </TouchableOpacity>
        <View
          style={{
            width: "70%",
            height: "30%",
            zIndex: 2,
            backgroundColor: "white",
            position: "absolute",
            opacity: 0.9,
            borderRadius: 20,
          }}
        ></View> */}
      </View>
    </Basic>
  );
};
