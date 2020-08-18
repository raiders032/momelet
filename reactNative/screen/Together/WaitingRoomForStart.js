import React, { useEffect } from "react";
import { View, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Basic from "../../component/Basic";
import Card from "../../component/Card";
import socket from "../../socket";

export default ({ navigation, route }) => {
  useEffect(() => {
    socket.on("gameRoomUpdate", (msg) => {
      console.log(msg);
    });
  }, []);
  const footer = (
    <View
      style={{ height: "100%", justifyContent: "center", alignItems: "center" }}
    >
      <TouchableOpacity
        onPress={() => {
          socket.emit("gameStart", "gameStart message from client", (msg) => {
            console.log(msg);
            navigation.navigate("GameRoom", { msg });
          });
        }}
      >
        <Text style={{ fontFamily: "Godo", fontSize: 24 }}>시작하기</Text>
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
