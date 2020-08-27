import React from "react";
import { View, Text } from "react-native";
import comma from "../utils/comma";

import truncate from "../utils/truncate";
export default ({ menu, price }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 5,
      }}
    >
      <Text>{truncate(menu)}</Text>
      <Text>{comma(price)}원</Text>
    </View>
  );
};
