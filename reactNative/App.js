import { FontAwesome } from '@expo/vector-icons';
import { AppLoading } from 'expo';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';
import * as SecureStore from 'expo-secure-store';
import React, { useState, useEffect } from 'react';
import { StyleSheet, AsyncStorage, Image, View } from 'react-native';

import { apis } from './api';
import Home from './screen/Home';
import Login from './screen/Login';
import dateCheck from './utils/dateCheck';

// 이미지 캐싱 함수
const cacheImages = (images) => {
  return images.map((image) => {
    if (typeof image === 'string') {
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
    Godo: require('./assets/GodoM.ttf'),
    NotoSansCJKkr: require('./assets/NotoSansMonoCJKkr-Regular.otf'),
  });

  // userToken 가져오는 함수
  const setTokenInSecure = async (tokenInfo) => {
    await SecureStore.setItemAsync(
      'access_TokenInfo',
      JSON.stringify({
        accessToken: tokenInfo.accessToken,
        accessTokenExpiredDate: tokenInfo.accessTokenExpiryDate,
      })
    );
    await SecureStore.setItemAsync(
      'refresh_TokenInfo',
      JSON.stringify({
        refreshToken: tokenInfo.refreshToken,
        refreshTokenExpiredDate: tokenInfo.refreshTokenExpiryDate,
      })
    );
  };

  const _retrieveData = async () => {
    try {
      const refreshToken = JSON.parse(await SecureStore.getItemAsync('refresh_TokenInfo'));

      if (dateCheck(refreshToken.refreshTokenExpiredDate)) {
        const newRefreshToken = await apis.refreshToken();

        if (!newRefreshToken.data.errorCode) {
          const tokenInfo = {
            accessToken: newRefreshToken.data.data.tokens.accessToken.jwtToken,
            accessTokenExpiryDate: newRefreshToken.data.data.tokens.accessToken.formattedExpiryDate,
            refreshToken: newRefreshToken.data.data.tokens.refreshToken.jwtToken,
            refreshTokenExpiryDate:
              newRefreshToken.data.data.tokens.refreshToken.formattedExpiryDate,
          };

          setTokenInSecure(tokenInfo);
          setUserToken(newRefreshToken.data.data.tokens.accessToken.jwtToken);
        }
      } else {
        //리프레쉬 토큰이 만료되었기 때문에 로그인 화면으로 돌아감 / userToken 을 건들지 않기 때문에 가능 로그인 화면으로 자연스럽게 가게된다
      }
    } catch (error) {}
  };

  const afterLogin = async (userToken, tokenInfo) => {
    setTokenInSecure(tokenInfo);

    // await AsyncStorage.setItem("@userToken", userToken);
    // await AsyncStorage.setItem("@userToken", null);
    setUserToken(userToken);
  };

  const _loadAssetsAsync = async () => {
    const imageAssets = cacheImages([
      require('./assets/bg.jpg'),
      require('./assets/like.png'),
      require('./assets/soso.png'),
      require('./assets/dislike.png'),
      require('./assets/likeIn.png'),
      require('./assets/sosoIn.png'),
      require('./assets/dislikeIn.png'),
      require('./assets/likeOut.png'),
      require('./assets/sosoOut.png'),
      require('./assets/dislikeOut.png'),
      require('./assets/momulet.png'),
      require('./assets/home.png'),
      require('./assets/imageEdit.png'),
      require('./assets/nameEdit.png'),
      // require('./assets/categories/korean.png'),
      // require('./assets/categories/koreanS.png'),
      // require('./assets/categories/beer.png'),
      // require('./assets/categories/beerS.png'),
      // require('./assets/categories/burger.png'),
      // require('./assets/categories/burgerS.png'),
      // require('./assets/categories/chicken.png'),
      // require('./assets/categories/chickenS.png'),
      // require('./assets/categories/chinese.png'),
      // require('./assets/categories/chineseS.png'),
      // require('./assets/categories/chitterlings.png'),
      // require('./assets/categories/chitterlingsS.png'),
      // require('./assets/categories/hotpot.png'),
      // require('./assets/categories/hotpotS.png'),
      // require('./assets/categories/japanese.png'),
      // require('./assets/categories/japaneseS.png'),
      // require('./assets/categories/meat.png'),
      // require('./assets/categories/meatS.png'),
      // require('./assets/categories/snackBar.png'),
      // require('./assets/categories/snackBarS.png'),
      // require('./assets/categories/western.png'),
      // require('./assets/categories/westernS.png'),
      // require('./assets/categories/world.png'),
      // require('./assets/categories/worldS.png'),
      require('./assets/call.png'),
      require('./assets/copy.png'),
      require('./assets/geo.png'),
    ]);

    const fontAssets = cacheFonts([FontAwesome.font, { Godo: require('./assets/GodoM.ttf') }]);

    await Promise.all([...imageAssets, ...fontAssets]);
  };

  useEffect(() => {
    // tmpReset();
    _retrieveData();
  }, []);

  if (assetIsReady && fontsLoaded) {
    if (userToken) {
      return <Home />;
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
          // console.error('error in load asset', error);
        }}
      />
    );
  }
}
