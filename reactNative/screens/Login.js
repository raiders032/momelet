import React from "react";
import { View, AsyncStorage } from "react-native";
import LoginButton from "../components/LoginButton";

import * as WebBrowser from "expo-web-browser";
import * as Linking from "expo-linking";
import getEnvVars from "../enviroment";

const _storeData = async (token) => {
  try {
    await AsyncStorage.setItem("@userToken", token);
    console.log(AsyncStorage.getItem("userToken"));
  } catch (error) {
    console.error("error in store asyncdata", error);
  }
};

const onPress = async (setToken, where) => {
  console.log(Linking.makeUrl(""));
  const { apiUrl } = getEnvVars();
  const URL = `${apiUrl}/oauth2/authorize/${where}?redirect_uri=${Linking.makeUrl(
    ""
  )}`;
  const supported = await Linking.canOpenURL(URL);
  console.log(URL, supported);
  if (supported) {
    try {
      console.log("helo");
      const result = await WebBrowser.openAuthSessionAsync(URL);

      await _storeData(Linking.parse(result.url).queryParams.token);
      await setToken(Linking.parse(result.url).queryParams.token);
    } catch (error) {
      console.error("error in login", error);
    }
  }
};

export default ({ setToken }) => {
  return (
    <View style={{ justifyContent: "center", alignItems: "center" }}>
      <LoginButton
        title="Google Login"
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
    </View>
  );
};
