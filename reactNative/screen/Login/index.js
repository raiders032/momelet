import React, { useRef } from "react";
import {
  Animated,
  StyleSheet,
  View,
  Dimensions,
  Text,
  TouchableOpacity,
  Image as reactImage
} from "react-native";
import Svg, { Image } from "react-native-svg";
import * as WebBrowser from "expo-web-browser";
import * as Linking from "expo-linking";
import Constants from "expo-constants";

import getEnvVars from "../../enviroment";

const { width, height } = Dimensions.get("window");
const onPress = async (afterLogin, where) => {
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
    console.log(data.queryParams.token);
    await afterLogin(data.queryParams.token);
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
      console.log("Login Success");
    } catch (error) {
      console.error("error in login", error);
    }
  }
};
export default function App({ afterLogin }) {
  const animatedObj = useRef(new Animated.Value(0)).current;

  const changeStart = () => {
    Animated.timing(animatedObj, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  const cancelPress = () => {
    Animated.timing(animatedObj, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  const buttonOpacity = animatedObj.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0],
  });

  const buttonY = animatedObj.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 100],
    extrapolate: "identity",
  });

  const bgY = animatedObj.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -height / 4],
  });

  const textInputY = animatedObj.interpolate({
    inputRange: [0, 1],
    outputRange: [height / 4, 0],
  });

  return (
    <View
      style={{ flex: 1, backgroundColor: "white", justifyContent: "flex-end" }}
    >
      <Animated.View
        style={{
          ...StyleSheet.absoluteFill,
          transform: [{ translateY: bgY }],
          backgroundColor: "#FEEE7D",
        }}
      >
        <Svg width={width} height={height + 15}>
          <Image
            href={require("../../assets/logo.png")}
            width={width}
            height={height + 15}
            preserveAspectRatio="xMidYMid"
            clipPath="url(#clip)"
          />
        </Svg>
      </Animated.View>

      <View style={{ height: height / 4, justifyContent: "center" }}>
      <TouchableOpacity onPress={changeStart}>
        <Animated.View
          style={{
            ...styles.button,
            opacity: buttonOpacity,
            elevation: 7,
            transform: [{ translateY: buttonY }],
          }}
        >
          
            <Text
              style={{ fontFamily: "Godo", fontSize: 30, fontWeight: "bold" }}
            >
              로그인
            </Text>
          
        </Animated.View>
        </TouchableOpacity>
        <Animated.View
          style={{
            height: height / 4,
            ...StyleSheet.absoluteFill,
            justifyContent: "center",
            transform: [{ translateY: textInputY }],
          }}
        >
          <Animated.View
            style={{ ...styles.closeButton, opacity: animatedObj,elevation: 5 }}
          >
            <TouchableOpacity onPress={cancelPress}>
              <Text style={{ fontSize: 15 }}>X</Text>
            </TouchableOpacity>
          </Animated.View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
            }}
          >
            <TouchableOpacity onPress={() => onPress(afterLogin, "google")}>
              <Svg width={50} height={50}>
          <Image
            href={require("../../assets/google.png")}
            width={50}
            height={50}
            preserveAspectRatio="xMidYMid"
          />
        </Svg>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => onPress(afterLogin, "kakao")}>
            <Svg width={50} height={50}>
          <Image
            href={require("../../assets/kakao.png")}
            width={50}
            height={50}
            preserveAspectRatio="xMidYMid"
          />
        </Svg>
        
            </TouchableOpacity>
            <TouchableOpacity onPress={() => onPress(afterLogin, "naver")}>
              {/* <TouchableOpacity onPress={() => setUserToken("google")}> */}
              <Svg width={50} height={50}>
          <Image
            href={{uri:"https://search.pstatic.net/common/?src=http%3A%2F%2Fimgnews.naver.net%2Fimage%2F5097%2F2014%2F11%2F17%2F224765_9935_410_99_20141117105908.png&type=sc960_832"}}
            width={50}
            height={50}
            preserveAspectRatio="xMidYMid"
          />
        </Svg>
              {/* <View style={{ ...styles.loginButton, borderColor: "green" }}>
                <Text>N</Text>
              </View> */}
            </TouchableOpacity>
          </View>
        </Animated.View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    backgroundColor: "white",
    height: 70,
    marginHorizontal: 20,
    borderRadius: 35,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 5,
    shadowColor: "black",
    shadowOpacity: 0.2,
    shadowOffset: { width: 8, height: 8 },
  },
  textInput: {
    backgroundColor: "white",
    height: 50,
    width: width / 1.2,
    marginHorizontal: 20,
    borderRadius: 25,
    borderWidth: 0.5,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 5,
    padding: 20,
  },
  closeButton: {
    height: 40,
    width: 40,
    backgroundColor: "white",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: -20,
    left: width / 2 - 20,
    shadowColor: "black",
    shadowOpacity: 0.2,
    shadowOffset: { width: 8, height: 8 },
  },
  loginButton: {
    height: 60,
    width: 60,
    backgroundColor: "white",
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "black",
    shadowOpacity: 0.2,
    shadowOffset: { width: 4, height: 4 },
    borderWidth: 0.5,
  },
});
