import React from "react";
import { View, AsyncStorage } from "react-native";
import LoginButton from "../components/LoginButton";
import * as WebBrowser from "expo-web-browser";

const _storeData = async (token) => {
  try {
    await AsyncStorage.setItem("@userToken", token);
  } catch (error) {
    console.error("error in store asyncdata", error);
  }
};

import * as Linking from "expo-linking";
const onPress = async (setToken, where) => {
  console.log(setToken);
  const URL = `http://ec2-13-125-90-157.ap-northeast-2.compute.amazonaws.com:8080/oauth2/authorize/${where}?redirect_uri=${Linking.makeUrl(
    ""
  )}`;
  const supported = await Linking.canOpenURL(URL);

  if (supported) {
    try {
      const result = await WebBrowser.openAuthSessionAsync(URL);
      setToken(Linking.parse(result.url).queryParams.token);

      _storeData(Linking.parse(result.url).queryParams.token);
    } catch (error) {
      console.error("error in login", error);
    }
  }
};

export default ({ setToken }) => {
  return (
    <View>
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
        onPress={() => onPress(setToken, "Fackbook")}
      />
      <LoginButton
        title="KaKao Login"
        onPress={() => onPress(setToken, "kakao")}
      />
    </View>
  );
};
