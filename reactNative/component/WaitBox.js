import React from "react";
import { View, Dimensions } from "react-native";
const { width: WIDTH, height: HEIGHT } = Dimensions.get("window");
export default ({ children }) => {
  return (
    <View
      style={{
        width: WIDTH / 4 + 20,
        height: WIDTH / 4 + 20,
        backgroundColor: "#efefef",
        // backgroundColor: "black",
        borderRadius: 18,
      }}
    >
      {children}
    </View>
  );
};
