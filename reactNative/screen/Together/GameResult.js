import React from "react";
import { View, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Basic from "../../component/Basic";
import Card from "../../component/Card";
import socket from "../../socket";
export default ({ navigation, route }) => {
  const footer = (
    <View
      style={{ height: "100%", justifyContent: "center", alignItems: "center" }}
    >
      <TouchableOpacity>
        <Text style={{ fontFamily: "Godo", fontSize: 24 }}>홈으로</Text>
      </TouchableOpacity>
    </View>
  );
  return (
    <Basic footer={footer}>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Card>
          <Text>{route.params.msg}</Text>
        </Card>
      </View>
    </Basic>
  );
};
