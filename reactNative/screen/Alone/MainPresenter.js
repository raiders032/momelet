import React from "react";
import { View, Text, TouchableOpacity, Dimensions } from "react-native";
import Basic from "../../component/Basic";
import socket from "../../socket";
import RestaurantsSwipe from "../../component/RestaurantsSwipe";

export default ({ restaurants, navigation, user }) => {
  const sendTogetherMessage = () => {
    socket.emit("together", "together msg from client", (msg) => {
      navigation.navigate("Together", { msg, user: user.data.userInfo });
      // navigation.navigate("Together", { msg, user: "abc" });
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

  return (
    <Basic footer={footer}>
      <RestaurantsSwipe restaurants={restaurants} />
    </Basic>
  );
};
