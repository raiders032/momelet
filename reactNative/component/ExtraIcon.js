import React from "react";
import { Image, View, Text, Dimensions } from "react-native";

const { width: WIDTH, height: HEIGHT } = Dimensions.get("window");
export default ({ icon, text }) => {
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
        source={icon}
        style={{
          width: WIDTH / 10,
          height: WIDTH / 10,
          borderRadius: WIDTH / 20,
          marginBottom: 10,
        }}
      />
      <Text>{text}</Text>
    </View>
  );
};
