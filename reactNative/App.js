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
      const value = await AsyncStorage.getItem("@userToken");
      if (value !== null) {
        setUserToken(value);
      }
    } catch (error) {
      console.error("error in get token from device", error);
    }
  };
  const _loadAssetsAsync = async () => {
    const imageAssets = cacheImages([require("./assets/bg.jpg")]);

    const fontAssets = cacheFonts([FontAwesome.font]);
    await Promise.all([...imageAssets, ...fontAssets]);
  };

  useEffect(() => {
    _retrieveData();
  }, []);
  if (assetIsReady && fontsLoaded) {
    if (userToken) {
      return <Home userToken={userToken} />;
    } else {
      return <Login setUserToken={setUserToken} />;
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
