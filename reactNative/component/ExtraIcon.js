import React from "react";
import { Image, View, Text, Dimensions, TouchableOpacity } from "react-native";

const { width: WIDTH, height: HEIGHT } = Dimensions.get("window");
export default ({ icon, text, onPress }) => {
  return (
    <TouchableOpacity
      style={{
        height: "80%",
        width: "30%",
        alignItems: "center",
        justifyContent: "center",
      }}
      onPress={onPress}
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
    </TouchableOpacity>
  );
};
