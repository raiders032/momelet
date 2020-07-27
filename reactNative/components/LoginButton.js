import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

export default ({ title, onPress }) => (
  <TouchableOpacity onPress={onPress}>
    <View style={[styles.LoginButton]}>
      <Text>{title}</Text>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  LoginButton: {
    width: 200,
    height: 50,
    backgroundColor: "#61DAFB",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    marginVertical: 10,
  },
});
