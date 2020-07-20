import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";

export default ({ style }) => {
  console.log(style);
  return <View style={[style, { backgroundColor: "black" }]}></View>;
};
