import React from "react";
import { View, Text } from "react-native";
import truncate from "../utils/truncate";
export default ({ title, distance, point }) => {
  return (
    <View>
      <View style={{ flexDirection: "row", marginTop: 5 }}>
        <View style={{ marginRight: 4 }}>
          <Text style={{ fontFamily: "Godo", fontSize: 17 }}>
            {truncate(title, 10)}
          </Text>
        </View>
        <View
          style={{
            backgroundColor: "#e4e4e4",
            borderRadius: 4,
            width: 55,
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
