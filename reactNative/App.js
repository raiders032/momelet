import React, { useState, useEffect } from "react";
import { StyleSheet, AsyncStorage, Image, View } from "react-native";
import { AppLoading } from "expo";
import * as Font from "expo-font";
import { Asset } from "expo-asset";
import { FontAwesome } from "@expo/vector-icons";
import Login from "./screen/Login";
import Home from "./screen/Home";
// 이미지 캐싱 함수
const cacheImages = (images) => {
  return images.map((image) => {
    if (typeof image === "string") {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
};
// 폰트 캐싱 함수
const cacheFonts = (fonts) => {
  return fonts.map((font) => Font.loadAsync(font));
};

export default function App() {
  const [assetIsReady, setAssetIsReady] = useState(false);
  const [userToken, setUserToken] = useState(null);
  const [fontsLoaded] = Font.useFonts({
    Godo: require("./assets/GodoM.ttf"),
    NotoSansCJKkr: require("./assets/NotoSansMonoCJKkr-Regular.otf"),
  });
  // userToken 가져오는 함수
  const _retrieveData = async () => {
    try {
      // const value = await AsyncStorage.getItem("@userToken");
      const value = await AsyncStorage.getItem("@fortestthisisnotareal");

      if (value !== null) {
        setUserToken(value);
      }
    } catch (error) {
      console.error("error in get token from device", error);
    }
  };
  const afterLogin = async (userToken) => {
    await AsyncStorage.setItem("@userToken", userToken);
    // await AsyncStorage.setItem("@userToken", null);
    setUserToken(userToken);
  };
  const _loadAssetsAsync = async () => {
    const imageAssets = cacheImages([
      require("./assets/bg.jpg"),
      require("./assets/like.png"),
      require("./assets/soso.png"),
      require("./assets/dislike.png"),
      require("./assets/likeIn.png"),
      require("./assets/sosoIn.png"),
      require("./assets/dislikeIn.png"),
      require("./assets/likeOut.png"),
      require("./assets/sosoOut.png"),
      require("./assets/dislikeOut.png"),
      require("./assets/momulet.png"),
      require("./assets/home.png"),
      require("./assets/imageEdit.png"),
      require("./assets/nameEdit.png"),
      require("./assets/categories/korean.png"),
      require("./assets/categories/koreanS.png"),
      require("./assets/categories/beer.png"),
      require("./assets/categories/beerS.png"),
      require("./assets/categories/burger.png"),
      require("./assets/categories/burgerS.png"),
      require("./assets/categories/chicken.png"),
      require("./assets/categories/chickenS.png"),
      require("./assets/categories/chinese.png"),
      require("./assets/categories/chineseS.png"),
      require("./assets/categories/chitterlings.png"),
      require("./assets/categories/chitterlingsS.png"),
      require("./assets/categories/hotpot.png"),
      require("./assets/categories/hotpotS.png"),
      require("./assets/categories/japanese.png"),
      require("./assets/categories/japaneseS.png"),
      require("./assets/categories/meat.png"),
      require("./assets/categories/meatS.png"),
      require("./assets/categories/snackBar.png"),
      require("./assets/categories/snackBarS.png"),
      require("./assets/categories/western.png"),
      require("./assets/categories/westernS.png"),
      require("./assets/categories/world.png"),
      require("./assets/categories/worldS.png"),
    ]);

    const fontAssets = cacheFonts([FontAwesome.font]);
    await Promise.all([...imageAssets, ...fontAssets]);
  };

  useEffect(() => {
    // tmpReset();
    _retrieveData();
  }, []);
  if (assetIsReady && fontsLoaded) {
    if (userToken) {
      return <Home userToken={userToken} />;
    } else {
      return <Login afterLogin={afterLogin} />;
    }
  } else {
    return (
      <AppLoading
        startAsync={_loadAssetsAsync}
        onFinish={() => {
          setAssetIsReady(true);
        }}
        onError={(error) => {
          console.error("error in load asset", error);
        }}
      />
    );
  }
}
