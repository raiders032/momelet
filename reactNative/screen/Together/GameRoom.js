import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Basic from "../../component/Basic";
import socket from "../../socket";

export default ({ navigation, route }) => {
  const [good, setGood] = useState(0);
  const [soso, setSoso] = useState(0);
  const [bad, setBad] = useState(0);
  const [total, setTotal] = useState(0);
  const setNumber = (which) => {
    if (total === 6) {
      socket.emit("gameUserFinish", "gameUserFinish msg from client", (msg) => {
        console.log(msg);
        navigation.navigate("WaitingRoomForResult", { msg });
      });
    } else if (which === "good") {
      setGood((before) => before + 1);
      setTotal((before) => before + 1);
    } else if (which === "soso") {
      setSoso((before) => before + 1);
      setTotal((before) => before + 1);
    } else if (which === "bad") {
      setBad((before) => before + 1);
      setTotal((before) => before + 1);
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSoso((before) => before + 1);
      setTotal((before) => total + 1);
    }, 5000);
    return () => {
      clearInterval(timeout);
    };
  }, [total]);

  const footer = (
    <View
      style={{
        height: "100%",
        justifyContent: "space-around",
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <TouchableOpacity
        onPress={() => {
          setNumber("good");
        }}
      >
        <Text>좋아</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          setNumber("soso");
        }}
      >
        <Text>그저그래</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          setNumber("bad");
        }}
      >
        <Text>싫어</Text>
      </TouchableOpacity>
    </View>
  );
  return (
    <Basic footer={footer}>
      <View
        style={{
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View style={{ flexDirection: "row" }}>
          <Text>total : </Text>
          <Text>{total}</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text>좋아요 : </Text>
          <Text>{good}</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text>그저그래요 : </Text>
          <Text>{soso}</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text>싫어요 : </Text>
          <Text>{bad}</Text>
        </View>
      </View>
    </Basic>
  );
};
