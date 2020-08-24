import React from "react";
import PresentMenu from "./PresentMenu";
import { View, Dimensions } from "react-native";
const { width: WIDTH, height: HEIGHT } = Dimensions.get("window");

export default ({ menu, price, style }) => {
  return (
    <View
      style={{
        width: "100%",
        height: "10%",
        marginBottom: (HEIGHT / 360) * 8,
        borderColor: "#e4e4e4",
        borderBottomWidth: 0.7,
        ...style,
      }}
    >
      <PresentMenu menu={menu} price={price} />
    </View>
  );
};
