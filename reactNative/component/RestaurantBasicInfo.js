import React from "react";
import { View, Text } from "react-native";

export default ({ title, distance, point }) => {
  return (
    <View>
      <View style={{ flexDirection: "row", marginBottom: 15 }}>
        <View style={{ marginRight: 4 }}>
          <Text style={{ fontFamily: "Godo", fontSize: 20 }}>{title}</Text>
        </View>
        <View
          style={{
            backgroundColor: "#e4e4e4",
            borderRadius: 4,
            width: "30%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text>{distance}</Text>
        </View>
      </View>
      <Text style={{ fontFamily: "NotoSansCJKkr" }}>평점 {point}</Text>
    </View>
  );
};
