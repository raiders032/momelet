import React from "react";
import { View } from "react-native";
export default ({ children }) => {
  return (
    <View
      style={{
        backgroundColor: "white",
        height: "85%",
        width: "87%",
        borderRadius: 20,
        shadowOffset: { width: 4, height: 5 },
        shadowOpacity: 2,
        shadowColor: "grey",
      }}
    >
      {children}
    </View>
  );
};
