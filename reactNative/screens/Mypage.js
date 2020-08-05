import React from "react";
import { StyleSheet, View, Text } from "react-native";

export default ({ navigation, route: { params } }) => {
  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <View style={{ alignItems: "center", marginBottom: 30 }}>
        <Text>{params.name} 의 개인 페이지</Text>
        <Text>Email : {params.email}</Text>
        <Text>카테고리</Text>
      </View>
      <View>
        <View style={[styles.categoryLine]}>
          <Text>한식 </Text>
          <Text>양식 </Text>
          <Text>일식</Text>
        </View>
        <View style={[styles.categoryLine]}>
          <Text>세계음식 </Text>
          <Text>중식 </Text>
          <Text>분식 </Text>
        </View>
        <View style={[styles.categoryLine]}>
          <Text>카페 </Text>
          <Text>주점 </Text>
          <Text>기타 </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  CategoryContainer: {},
  categoryLine: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
});
