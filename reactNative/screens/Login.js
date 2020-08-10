import React from "react";
import { View, AsyncStorage, Image, ImageBackground } from "react-native";
import LoginButton from "../components/LoginButton";

import * as WebBrowser from "expo-web-browser";
import * as Linking from "expo-linking";
import getEnvVars from "../enviroment";
import Constants from "expo-constants";

const _storeData = async (token) => {
  try {
    await AsyncStorage.setItem("@userToken", token);
  } catch (error) {
    console.error("error in store asyncdata", error);
  }
};

const onPress = async (setToken, where) => {
  const { apiUrl } = getEnvVars();
  const URL = `${apiUrl}/oauth2/authorize/${where}?redirect_uri=${Linking.makeUrl(
    ""
  )}`;
  console.log(Linking.makeUrl(""));
  const _removeLinkingListener = () => {
    Linking.removeEventListener("url", _handleRedirect);
  };
  const _handleRedirect = async (event) => {
    if (Constants.platform.ios) {
      WebBrowser.dismissBrowser();
    } else {
      _removeLinkingListener();
    }

    let data = Linking.parse(event.url);
    console.log("hoxy?", event.url);
    await _storeData(data.queryParams.token);
    setToken(data.queryParams.token);
  };
  const addLinkingListener = () => {
    Linking.addEventListener("url", _handleRedirect);
  };
  const supported = await Linking.canOpenURL(URL);
  if (supported) {
    try {
      addLinkingListener();
      const result = await WebBrowser.openBrowserAsync(URL);
      if (Constants.platform.ios) {
        _removeLinkingListener();
      }
      // await _storeData(Linking.parse(result.url).queryParams.token);
      // setToken(Linking.parse(result.url).queryParams.token);
      console.log("abc", { result });
      console.log("Login Success");
    } catch (error) {
      console.error("error in login", error);
    }
  }
};

export default ({ setToken }) => {
  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        source={require("../assets/loginImage.png")}
        style={{
          flex: 1,
          resizeMode: "cover",
          alignItems: "center",
          justifyContent: "flex-end",
        }}
      >
        <LoginButton
          title="GOOGLE LOGIN"
          onPress={() => onPress(setToken, "google")}
        />
        <LoginButton
          title="Naver Login"
          onPress={() => onPress(setToken, "naver")}
        />
        <LoginButton
          title="Facbook Login"
          onPress={() => onPress(setToken, "facebook")}
        />
        <LoginButton
          title="KaKao Login"
          onPress={() => onPress(setToken, "kakao")}
        />
      </ImageBackground>
    </View>
  );
};
