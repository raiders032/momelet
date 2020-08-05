import React from "react";
import { View, AsyncStorage, Image, ImageBackground } from "react-native";
import LoginButton from "../components/LoginButton";

import * as WebBrowser from "expo-web-browser";
import * as Linking from "expo-linking";
import getEnvVars from "../enviroment";

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
  const supported = await Linking.canOpenURL(URL);
  if (supported) {
    try {
      const result = await WebBrowser.openAuthSessionAsync(URL);

      await _storeData(Linking.parse(result.url).queryParams.token);
      setToken(Linking.parse(result.url).queryParams.token);
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
        {/* <LoginButton
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
        /> */}
      </ImageBackground>
    </View>
  );
};
