import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";

export default ({ style }) => {
  for (let i = 0; i < 10; i++) {}
  return <View style={[style, { backgroundColor: "black" }]}></View>;
};
