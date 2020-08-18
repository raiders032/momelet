import React from "react";
import Basic from "../../component/Basic";
import { View, Text, TouchableOpacity } from "react-native";

export default ({ navigation }) => {
  const footer = (
    <View
      style={{ height: "100%", justifyContent: "center", alignItems: "center" }}
    >
      <TouchableOpacity>
        <Text style={{ fontFamily: "Godo", fontSize: 24 }}>저장</Text>
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
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("NameEdit");
          }}
        >
          <Text style={{ fontFamily: "Godo", fontSize: 24 }}>이름수정</Text>
        </TouchableOpacity>
      </View>
    </Basic>
  );
};
