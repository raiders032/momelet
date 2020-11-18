import Constants from 'expo-constants';
import * as Linking from 'expo-linking';
import * as WebBrowser from 'expo-web-browser';
import React, { useRef } from 'react';
import { Animated, StyleSheet, View, Dimensions, Text, TouchableOpacity } from 'react-native';
import Svg, { Image } from 'react-native-svg';

// import getEnvVars from '../../enviroment';

const { width, height } = Dimensions.get('window');
const onPress = async (afterLogin, where) => {
  // const { apiUrl } = getEnvVars();
  let URL;

  if (where != 'apple') {
    URL = `http://ec2-3-34-162-241.ap-northeast-2.compute.amazonaws.com:8080/oauth2/authorize/${where}?redirect_uri=${Linking.makeUrl(
      ''
    )}`;
  } else {
  }

  console.log('screen:Login 리다이렉트 url', Linking.makeUrl(''));

  const _removeLinkingListener = () => {
    Linking.removeEventListener('url', _handleRedirect);
  };
  const _handleRedirect = async (event) => {
    if (Constants.platform.ios) {
      WebBrowser.dismissBrowser();
    } else {
      _removeLinkingListener();
    }

    const data = Linking.parse(event.url);

    await afterLogin(data.queryParams.accessToken, data.queryParams);
  };
  const addLinkingListener = () => {
    Linking.addEventListener('url', _handleRedirect);
  };
  const supported = await Linking.canOpenURL(URL);

  if (supported) {
    try {
      addLinkingListener();

      const result = await WebBrowser.openBrowserAsync(URL);

      if (Constants.platform.ios) {
        _removeLinkingListener();
      }

      console.log('Login Success');
    } catch (error) {
      console.error('error in login', error);
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
    extrapolate: 'identity',
  });

  const bgY = animatedObj.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -height / 2.5],
  });

  const textInputY = animatedObj.interpolate({
    inputRange: [0, 1],
    outputRange: [height / 2.5, 0],
  });

  return (
    <View style={{ flex: 1, backgroundColor: 'white', justifyContent: 'flex-end' }}>
      <Animated.View
        style={{
          ...StyleSheet.absoluteFill,
          transform: [{ translateY: bgY }],
          backgroundColor: '#FEEE7D',
        }}>
        <Svg width={width} height={height + 15}>
          <Image
            href={require('../../assets/logo.png')}
            width={width}
            height={height + 15}
            preserveAspectRatio="xMidYMid"
            clipPath="url(#clip)"
          />
        </Svg>
      </Animated.View>

      <View style={{ height: height / 2.5, justifyContent: 'center' }}>
        <Animated.View
          style={{
            ...styles.button,
            opacity: buttonOpacity,
            transform: [{ translateY: buttonY }],
            elevation: 8,
          }}>
          <TouchableOpacity onPress={changeStart}>
            <Text style={{ fontSize: 30, fontWeight: 'bold' }}>로그인</Text>
          </TouchableOpacity>
        </Animated.View>

        <Animated.View
          style={{
            height: height / 2.5,
            ...StyleSheet.absoluteFill,
            justifyContent: 'center',
            transform: [{ translateY: textInputY }],
            backgroundColor: '#f7f7f7',
          }}>
          <Animated.View style={{ ...styles.closeButton, opacity: animatedObj }}>
            <TouchableOpacity onPress={cancelPress}>
              <Text style={{ fontSize: 15 }}>X</Text>
            </TouchableOpacity>
          </Animated.View>
          <View
            style={{
              height: '100%',
              width: '100%',

              marginTop: 40,
            }}>
            <TouchableOpacity
              onPress={() => onPress(afterLogin, 'google')}
              style={{ justifyContent: 'center', alignItems: 'center', height: '30%' }}>
              <View
                style={{
                  width: '80%',
                  backgroundColor: 'white',
                  height: '70%',
                  borderRadius: 10,
                  flexDirection: 'row',
                  elevation: 8,
                  paddingTop: 3,
                }}>
                <Svg
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '30%',
                  }}>
                  <Image href={require('../../assets/google.png')} height="90%" />
                </Svg>
                <View
                  style={{
                    right: 0,
                    justifyContent: 'center',
                    height: '100%',
                    width: '70%',
                    alignItems: 'center',
                  }}>
                  <Text style={{ fontSize: 18, fontWeight: '600' }}>구글로 시작하기</Text>
                </View>
              </View>
            </TouchableOpacity>
            {/* <TouchableOpacity
              onPress={() => onPress(afterLogin, 'google')}
              style={{ justifyContent: 'center', alignItems: 'center', height: '30%' }}>
              <View
                style={{
                  width: '80%',
                  backgroundColor: 'black',
                  height: '70%',
                  borderRadius: 10,
                  flexDirection: 'row',
                  elevation: 8,
                  paddingTop: 3,
                }}>
                <Svg
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '30%',
                  }}>
                  <Image href={require('../../assets/apple_logo.png')} height="90%" width="100%" />
                </Svg>
                <View
                  style={{
                    right: 0,
                    justifyContent: 'center',
                    height: '100%',
                    width: '70%',
                    alignItems: 'center',
                  }}>
                  <Text style={{ fontSize: 18, fontWeight: '600', color: 'white' }}>
                    Sign in with Apple
                  </Text>
                </View>
              </View>
            </TouchableOpacity> */}
            <TouchableOpacity
              onPress={() => onPress(afterLogin, 'naver')}
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                height: '30%',
              }}>
              <View
                style={{
                  width: '80%',
                  backgroundColor: '#5fbb41',
                  height: '70%',
                  borderRadius: 10,
                  flexDirection: 'row',
                  elevation: 8,
                  paddingTop: 3,
                }}>
                <Svg style={{ width: '30%' }}>
                  <Image
                    href={require('../../assets/naver.png')}
                    height="90%"
                    preserveAspectRatio="xMidYMid"
                    clipPath="url(#clip)"
                  />
                </Svg>
                <View
                  style={{
                    right: 0,
                    justifyContent: 'center',
                    height: '100%',
                    width: '70%',
                    alignItems: 'center',
                  }}>
                  <Text style={{ fontSize: 18, fontWeight: '600', color: 'white' }}>
                    네이버로 시작하기
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => onPress(afterLogin, 'kakao')}
              style={{ justifyContent: 'center', alignItems: 'center', height: '30%' }}>
              <View
                style={{
                  width: '80%',
                  backgroundColor: '#f5e44f',
                  height: '70%',
                  borderRadius: 10,
                  flexDirection: 'row',
                  paddingTop: 3,
                  elevation: 8,
                }}>
                <Svg style={{ width: '30%' }}>
                  <Image
                    href={require('../../assets/kakao.png')}
                    height="90%"
                    preserveAspectRatio="xMidYMid"
                    clipPath="url(#clip)"
                  />
                </Svg>
                <View
                  style={{
                    right: 0,
                    justifyContent: 'center',
                    height: '100%',
                    width: '70%',
                    alignItems: 'center',
                  }}>
                  <Text style={{ fontSize: 18, fontWeight: '600' }}>카카오로 시작하기</Text>
                </View>
              </View>
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
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: 'white',
    height: 70,
    marginHorizontal: 20,
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 5,
    shadowColor: 'black',
    shadowOpacity: 0.2,
    shadowOffset: { width: 8, height: 8 },
    top: 20,
  },
  textInput: {
    backgroundColor: 'white',
    height: 50,
    width: width / 1.2,
    marginHorizontal: 20,
    borderRadius: 25,
    borderWidth: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 5,
    padding: 20,
  },
  closeButton: {
    height: 40,
    width: 40,
    backgroundColor: 'white',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: -20,
    left: width / 2 - 20,
    shadowColor: 'black',
    shadowOpacity: 0.2,
    shadowOffset: { width: 8, height: 8 },
  },
  loginButton: {
    height: 60,
    width: 60,
    backgroundColor: 'white',
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: 'black',
    shadowOpacity: 0.2,
    shadowOffset: { width: 4, height: 4 },
    borderWidth: 0.5,
  },
});
