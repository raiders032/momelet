import React, { useEffect } from "react";
import { View, Image, Text, Platform, PlatformColor } from "react-native";
import Basic from "../../../component/Basic";
import socket from "../../../socket";
import Footer from "../../../component/Footer";
import WaitBox from "../../../component/WaitBox";
import { TouchableOpacity } from "react-native-gesture-handler";

export default ({ users, onClick }) => {
  const abc = [];
  const footer = (
    <Footer
      onClick={() => {
        onClick();
      }}
      text={"시작하기"}
    />
  );
  //임시로 테스트 하기 위해서 11 개만 만들고 밑에 추가로 하나 만듬.
  for (let i = 0; i < 11; i++) {
    if (i < users.length) {
      abc.push(
        <WaitBox key={i}>
          <View
            style={{
              width: "100%",
              height: "100%",
              backgroundColor: "white",
              borderRadius: 18,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              style={{ width: "40%", height: "40%", borderRadius: 18 }}
              source={{ uri: users[i].imageUrl }}
            />
            <Text
              style={
                Platform.OS === "ios"
                  ? {
                      fontFamily: "NotoSansCJKkr",
                      fontSize: 15,
                      marginTop: 10,
                    }
                  : {
                      fontFamily: "Godo",
                      fontSize: 15,
                      marginTop: 10,
                    }
              }
            >
              {users[i].name}
            </Text>
          </View>
        </WaitBox>
      );
    } else {
      abc.push(<WaitBox key={i}></WaitBox>);
    }
  }
  return (
    <Basic footer={footer}>
      <View
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: "#f7f7f7",
          paddingVertical: 20,
          paddingHorizontal: 10,
          flexDirection: "row",
          justifyContent: "space-around",
          flexWrap: "wrap",
          alignContent: "space-around",
        }}
      >
        {abc}
        {/* 이 부분은 실제 서버와 연동시 삭제 */}
        <TouchableOpacity
          onPress={() => {
            socket.emit("tmpEvent", "tmptmp");
          }}
        >
          <WaitBox />
        </TouchableOpacity>
        {/* 여기까지 */}
      </View>
    </Basic>
  );
};
