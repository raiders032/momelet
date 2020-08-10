import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Button, AsyncStorage } from "react-native";

import Category from "../components/Category";
import { apis } from "../api";
export default ({ navigation, route: { params } }) => {
  console.log(params);
  const [userCategory, setUserCategory] = useState({
    한식: params.categories["한식"],
    중식: params.categories["중식"],
    분식: params.categories["분식"],
    일식: params.categories["일식"],
    양식: params.categories["양식"],
    기타: params.categories["기타"],
    주점: params.categories["주점"],
    고기: params.categories["고기"],
    치킨: params.categories["치킨"],
    세계음식: params.categories["세계음식"],
  });
  const editMyInfo = async () => {
    const token = await AsyncStorage.getItem("@userToken");

    const categories = [
      "한식",
      "중식",
      "분식",
      "일식",
      "양식",
      "기타",
      "주점",
      "고기",
      "치킨",
      "세계음식",
    ];
    const result = [];
    categories.forEach((item) => {
      if (userCategory[item]) {
        result.push(item);
      }
    });
    const apiResult = await apis.editUser(
      params.id,
      result,
      params.imageUrl,
      params.name,
      token
    );

    navigation.navigate("HomeContainer", {
      userToken: token,
      isChanged: params.isChanged + 1,
    });
  };
  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <View style={{ alignItems: "center", marginBottom: 30 }}>
        <Text>닉네임 : {params.name}</Text>
        <Button
          title="이름 수정"
          onPress={() => {
            navigation.navigate("EditName", { placeholder: params.name });
          }}
        />

        <Text>카테고리</Text>
      </View>
      <View>
        <View style={[styles.categoryLine]}>
          <Category
            title="한식"
            categories={userCategory}
            setCategory={setUserCategory}
          />
          <Category
            title="중식"
            categories={userCategory}
            setCategory={setUserCategory}
          />
          <Category
            title="일식"
            categories={userCategory}
            setCategory={setUserCategory}
          />
        </View>
        <View style={[styles.categoryLine]}>
          <Category
            title="양식"
            categories={userCategory}
            setCategory={setUserCategory}
          />
          <Category
            title="세계음식"
            categories={userCategory}
            setCategory={setUserCategory}
          />
          <Category
            title="기타"
            categories={userCategory}
            setCategory={setUserCategory}
          />
        </View>
        <View style={[styles.categoryLine]}>
          <Category
            title="주점"
            categories={userCategory}
            setCategory={setUserCategory}
          />
          <Category
            title="고기"
            categories={userCategory}
            setCategory={setUserCategory}
          />
          <Category
            title="치킨"
            categories={userCategory}
            setCategory={setUserCategory}
          />
        </View>
      </View>
      <Button title="수정하기" onPress={editMyInfo} />
    </View>
  );
};

const styles = StyleSheet.create({
  CategoryContainer: {},
  categoryLine: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  checked: {
    color: "blue",
  },
  disChecked: {
    color: "red",
  },
});
