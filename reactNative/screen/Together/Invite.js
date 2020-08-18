import React, { useState } from "react";
import { View, Text, Dimensions } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Basic from "../../component/Basic";
import Card from "../../component/Card";
import socket from "../../socket";
import AroundUser from "../../component/AroundUser";
const { widht: WIDTH, height: HEIGHT } = Dimensions.get("window");
export default ({ navigation, route }) => {
  const tmpUsers = JSON.parse(route.params.msg).aroundUsers;
  const [users, setUsers] = useState(
    tmpUsers.map((user) => {
      return { ...user, selected: false };
    })
  );

  const footer = (
    <View
      style={{
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff271",
      }}
    >
      <TouchableOpacity
        onPress={() => {
          socket.emit(
            "togetherInvite",
            "togetherInvite message from client",
            (msg) => {
              console.log(msg);
              navigation.navigate("WaitingRoomForStart", { msg });
            }
          );
        }}
      >
        <Text style={{ fontFamily: "Godo", fontSize: 24 }}>초대하기</Text>
      </TouchableOpacity>
    </View>
  );
  return (
    <Basic footer={footer}>
      <View style={{ flex: 1, backgroundColor: "white" }}>
        {users.map((user, index) => {
          return (
            <AroundUser
              key={index}
              index={index}
              setUsers={setUsers}
              user={user}
            />
          );
        })}
      </View>
    </Basic>
  );
};
