import React from "react";
import { View, Text, TouchableOpacity, Dimensions } from "react-native";
import Basic from "../../component/Basic";
import socket from "../../socket";
import RestaurantsSwipe from "../../component/RestaurantsSwipe";

export default ({
  restaurants,
  navigation,
  user,
  sendTogetherMessage,
  coverMessageConfig,
  userChangeCount,
}) => {
  const msg = { id: 2, latitude: 37.5, longitude: 127.49999 };

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
          navigation.navigate("Mypage", {
            user: user.data.userInfo,
            userChangeCount: userChangeCount,
          });
        }}
        // onPress={sendTmpMsg3}
      >
        <Text style={{ fontFamily: "Godo" }}>내 설정</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <Basic
      footer={footer}
      zIndex={coverMessageConfig.zIndex}
      coverMessageConfig={coverMessageConfig}
    >
      {restaurants.length > 3 ? (
        <RestaurantsSwipe restaurants={restaurants} />
      ) : (
        <View></View>
      )}
    </Basic>
  );
};
