import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
export default ({ text, onClick, style }) => {
  return (
    <TouchableOpacity onPress={onClick}>
      <View
        style={{
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#fff271",
          ...style,
        }}
      >
        <Text style={{ fontFamily: "Godo", fontSize: 24 }}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
};
