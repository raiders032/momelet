import React from "react";
import PresentMenu from "./PresentMenu";
import { View } from "react-native";

export default ({ menu, price, style }) => {
  return (
    <View
      style={{
        width: "100%",
        marginBottom: 20,
        borderColor: "#e4e4e4",
        borderBottomWidth: 0.7,
        ...style,
      }}
    >
      <PresentMenu menu={menu} price={price} />
    </View>
  );
};
