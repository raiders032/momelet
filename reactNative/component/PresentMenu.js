import React from "react";
import { View, Text } from "react-native";
export default ({ menu, price }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 5,
      }}
    >
      <Text>{menu}</Text>
      <Text>{price}</Text>
    </View>
  );
};
