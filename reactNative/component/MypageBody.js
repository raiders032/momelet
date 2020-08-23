import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import Category from "./Category";
export default ({ categories, setUser }) => {
  const [categoryLayout, setCategoryLayout] = useState({
    height: "0",
    width: "0",
  });
  const categoryClicked = (categoryName) => {
    setUser((before) => {
      const target = categoryName;
      const changedCategories = {
        ...before,
        categories: {
          ...before.categories,
          [target]: before.categories[target] ? 0 : 1,
        },
      };
      return changedCategories;
    });
  };
  return (
    <View
      style={{
        height: "70%",

        paddingBottom: 10,
        flexWrap: "wrap",
      }}
    >
      <View
        style={{
          width: "100%",
          height: "25%",
          justifyContent: "space-around",
          flexDirection: "row",
          alignItems: "center",
        }}
        onLayout={(event) => {
          setCategoryLayout(event.nativeEvent.layout);
        }}
      >
        <Category
          size={categoryLayout.height}
          image={
            categories["한식"]
              ? require("../assets/categories/koreanS.png")
              : require("../assets/categories/korean.png")
          }
          categoryName={"한식"}
          onPress={categoryClicked}
        />

        <Category
          size={categoryLayout.height}
          image={
            categories["중식"]
              ? require("../assets/categories/chineseS.png")
              : require("../assets/categories/chinese.png")
          }
          categoryName={"중식"}
          onPress={categoryClicked}
        />
        <Category
          size={categoryLayout.height}
          image={
            categories["일식"]
              ? require("../assets/categories/japaneseS.png")
              : require("../assets/categories/japanese.png")
          }
          categoryName={"일식"}
          onPress={categoryClicked}
        />
      </View>
      <View
        style={{
          width: "100%",
          height: "25%",
          justifyContent: "space-around",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Category
          size={categoryLayout.height}
          image={
            categories["양식"]
              ? require("../assets/categories/westernS.png")
              : require("../assets/categories/western.png")
          }
          categoryName={"양식"}
          onPress={categoryClicked}
        />
        <Category
          size={categoryLayout.height}
          image={
            categories["고기"]
              ? require("../assets/categories/meatS.png")
              : require("../assets/categories/meat.png")
          }
          categoryName={"고기"}
          onPress={categoryClicked}
        />
        <Category
          size={categoryLayout.height}
          image={
            categories["치킨"]
              ? require("../assets/categories/chickenS.png")
              : require("../assets/categories/chicken.png")
          }
          categoryName={"치킨"}
          onPress={categoryClicked}
        />
      </View>
      <View
        style={{
          width: "100%",
          height: "25%",
          justifyContent: "space-around",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Category
          size={categoryLayout.height}
          image={
            categories["세계음식"]
              ? require("../assets/categories/worldS.png")
              : require("../assets/categories/world.png")
          }
          categoryName={"세계음식"}
          onPress={categoryClicked}
        />
        <Category
          size={categoryLayout.height}
          image={
            categories["분식"]
              ? require("../assets/categories/snackBarS.png")
              : require("../assets/categories/snackBar.png")
          }
          categoryName={"분식"}
          onPress={categoryClicked}
        />
        <Category
          size={categoryLayout.height}
          image={
            categories["패스트푸드"]
              ? require("../assets/categories/burgerS.png")
              : require("../assets/categories/burger.png")
          }
          categoryName={"패스트푸드"}
          onPress={categoryClicked}
        />
      </View>
      <View
        style={{
          width: "100%",
          height: "25%",
          justifyContent: "space-around",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Category
          size={categoryLayout.height}
          image={
            categories["주점"]
              ? require("../assets/categories/beerS.png")
              : require("../assets/categories/beer.png")
          }
          categoryName={"주점"}
          onPress={categoryClicked}
        />
        <Category
          size={categoryLayout.height}
          image={
            categories["카페"]
              ? require("../assets/categories/hotpotS.png")
              : require("../assets/categories/hotpot.png")
          }
          categoryName={"카페"}
          onPress={categoryClicked}
        />
        <Category
          size={categoryLayout.height}
          image={
            categories["기타"]
              ? require("../assets/categories/chitterlingsS.png")
              : require("../assets/categories/chitterlings.png")
          }
          categoryName={"기타"}
          onPress={categoryClicked}
        />
      </View>
      <View
        style={{
          width: "100%",
          height: "25%",
          justifyContent: "space-around",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Category
          size={categoryLayout.height}
          image={
            categories["세계음식"]
              ? require("../assets/categories/worldS.png")
              : require("../assets/categories/world.png")
          }
          categoryName={"세계음식"}
        />
        <Category
          size={categoryLayout.height}
          image={
            categories["분식"]
              ? require("../assets/categories/snackBarS.png")
              : require("../assets/categories/snackBar.png")
          }
          categoryName={"분식"}
        />
        <Category
          size={categoryLayout.height}
          image={
            categories["패스트푸드"]
              ? require("../assets/categories/burgerS.png")
              : require("../assets/categories/burger.png")
          }
          categoryName={"패스트푸드"}
        />
      </View>
    </View>
  );
};
