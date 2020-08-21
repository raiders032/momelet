import React, { useEffect } from "react";
import { View, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Basic from "../../component/Basic";
import Card from "../../component/Card";
import socket from "../../socket";
import Footer from "../../component/Footer";

export default ({ navigation, route }) => {
  useEffect(() => {
    socket.on("gameAllFinish", (msg) => {
      console.log(msg);
      navigation.navigate("GameResult", { msg });
    });
  });
  // const footer = (
  //   <View
  //     style={{ height: "100%", justifyContent: "center", alignItems: "center" }}
  //   >
  //     <TouchableOpacity>
  //       <Text style={{ fontFamily: "Godo", fontSize: 24 }}>기다리는중 ...</Text>
  //     </TouchableOpacity>
  //   </View>
  // );
  const footer = (
    <Footer text="기다리는중 ..." style={{ backgroundColor: "white" }} />
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
