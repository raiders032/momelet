import React from "react";
import { View, Text, TouchableOpacity, Dimensions, Image } from "react-native";
const { width: WIDTH, height: HEIGHT } = Dimensions.get("window");
export default ({ total, selected, onClick }) => {
  return (
    <View style={{ width: "100%", height: "100%", position: "absolute" }}>
      <View
        style={{
          backgroundColor: "black",
          width: "100%",
          height: "100%",
          position: "absolute",
          opacity: 0.7,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        }}
      ></View>
      <View style={{ width: "100%", height: "100%", position: "absolute" }}>
        <View
          style={{
            height: "70%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontFamily: "Godo",
              color: "#fff271",
              fontSize: 20,
              marginBottom: HEIGHT / 22,
            }}
          >
            식당 결정!
          </Text>
          <Text
            style={{
              fontFamily: "Godo",
              color: "white",
              fontSize: 18,
              marginBottom: 10,
            }}
          >
            {total}명중 {selected}명의
          </Text>
          <Text style={{ fontFamily: "Godo", color: "white", fontSize: 18 }}>
            선택을 받았습니다.
          </Text>
        </View>
        <View
          style={{
            height: "30%",
          }}
        >
          <TouchableOpacity
            style={{
              height: "100%",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={onClick}
          >
            <Image
              source={require("../assets/home.png")}
              style={{
                height: WIDTH / 10,
                width: WIDTH / 10,
                resizeMode: "contain",
              }}
            />
            <Text
              style={{
                fontFamily: "Godo",
                color: "white",
                fontSize: 18,
                top: 2,
              }}
            >
              홈으로
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
