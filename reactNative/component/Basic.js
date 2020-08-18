import React, { Children } from "react";
import { View } from "react-native";

export default ({ children, footer }) => {
  return (
    <View style={{ flex: 1 }}>
      <View style={{ height: "90%", backgroundColor: "#FEEE7D" }}>
        {children}
      </View>
      <View style={{ height: "10%" }}>{footer}</View>
    </View>
  );
};
