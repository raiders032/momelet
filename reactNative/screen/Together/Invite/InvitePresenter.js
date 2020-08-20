import React, { useState } from "react";
import { View, Text, Dimensions } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Basic from "../../../component/Basic";
import Card from "../../../component/Card";
import socket from "../../../socket";
import AroundUser from "../../../component/AroundUser";
import Footer from "../../../component/Footer";
const { width: WIDTH, height: HEIGHT } = Dimensions.get("window");
export default ({ users, setUsers, onClick }) => {
  const footer = <Footer onClick={onClick} text={"초대하기"} />;
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
