import React from "react";
import { View, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Basic from "../../../component/Basic";
import Card from "../../../component/Card";
import RestaurantCard from "../../../component/RestaurantCard";
import CardTopCover from "../../../component/CardTopCover";
import Footer from "../../../component/Footer";
export default ({ result, total, selected, onClick }) => {
  console.log("total, selected : ", total, selected);

  // const footer = (
  //   <View
  //     style={{ height: "100%", justifyContent: "center", alignItems: "center" }}
  //   >
  //     <TouchableOpacity>
  //       <Text style={{ fontFamily: "Godo", fontSize: 24 }}>홈으로</Text>
  //     </TouchableOpacity>
  //   </View>
  // );
  const cover = (
    <CardTopCover total={total} selected={selected} onClick={onClick} />
  );
  const footer = (
    <Footer
      text="다시하기"
      onClick={() => {
        console.log("다시하기");
      }}
    />
  );
  return (
    <Basic footer={footer}>
      <View
        style={{
          width: "100%",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <RestaurantCard restaurant={result} cover={cover} />
      </View>
    </Basic>
  );
};
