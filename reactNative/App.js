import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { StyleSheet, Image, View, AsyncStorage } from "react-native";
import * as Font from "expo-font";
import { Asset } from "expo-asset";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import Home from "./screens/Home";
import { AppLoading } from "expo";
import { NavigationContainer } from "@react-navigation/native";
import Login from "./screens/Login";
import { apis } from "./api";
import { SafeAreaProvider } from "react-native-safe-area-context";

const cacheImages = (images) => {
  return images.map((image) => {
    if (typeof image === "string") {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
};

const cacheFonts = (fonts) => {
  return fonts.map((font) => Font.loadAsync(font));
};

export default function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [userToken, setUserToken] = useState(null);

  const loadAssets = () => {
    const images = cacheImages([
      "https://images.unsplash.com/photo-1592194850468-e42df770454b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
      require("./assets/splash.png"),
      require("./assets/food1.jpg"),
      require("./assets/food2.jpg"),
    ]);
    const fonts = cacheFonts([Ionicons.font, FontAwesome.font]);
    return Promise.all([...images, ...fonts]);
  };

  const onFinish = () => setIsLoading(true);
  console.log(userToken);
  useEffect(() => {
    const _retrieveData = async () => {
      try {
        const value = await AsyncStorage.getItem("@userToken");

        if (value !== null) {
          setUserToken(value);
        }
      } catch (error) {
        console.error("error in retrieveData at App.js", error);
      }
    };
    _retrieveData();
  }, []);
  return isLoading ? (
    <AppLoading
      startAsync={loadAssets}
      onFinish={onFinish}
      onError={console.error}
    />
  ) : userToken ? (
    // <SafeAreaProvider style={{ flex: 1 }}>
    <View style={[styles.container]}>
      <Home style={{ width: "100%", height: "100%" }} userToken={userToken} />
    </View>
  ) : (
    // </SafeAreaProvider>
    <SafeAreaProvider style={{ width: "100%", height: "100%" }}>
      <View style={[styles.container]}>
        <Login setToken={setUserToken} />
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
