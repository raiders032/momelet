import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default ({ style }) => {
  console.log(style);
  return <View style={[style]}></View>;
};
