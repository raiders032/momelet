import React from "react";
import { Image, View, Text, Dimensions } from "react-native";

const { width: WIDTH, height: HEIGHT } = Dimensions.get("window");
export default ({ uri, text }) => {
  return (
    <View
      style={{
        height: "80%",
        width: "30%",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Image
        source={{
          uri,
        }}
        style={{
          width: WIDTH / 9,
          height: WIDTH / 9,
          borderRadius: WIDTH / 18,
          marginBottom: 10,
        }}
      />
      <Text>{text}</Text>
    </View>
  );
};
