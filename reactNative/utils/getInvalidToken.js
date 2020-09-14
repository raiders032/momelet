import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

import getEnvVars from '../enviroment';
import dateCheck from './dateCheck';

const { apiUrl } = getEnvVars();

class Token {
  static getRefreshToken = async () => {
    const token = await SecureStore.getItemAsync('refresh_TokenInfo').refreshToken;

    return JSON.parse(token);
  };

  setRefreshToken = async () => {};
}

const getAccessToken = async () => {
  const token = await SecureStore.getItemAsync('access_TokenInfo').refreshToken;

  return JSON.parse(token);
};

const makeRequest = async (method, path, config, data = '') => {
  let tmpToken;

  if (path === 'v1/auth/refresh') {
    tmpToken = JSON.parse(await SecureStore.getItemAsync('refresh_TokenInfo')).refreshToken;
  } else {
    tmpToken = await getInvalidToken();
  }

  try {
    return await axios({
      url: `${apiUrl}/api/${path}`,
      method,
      headers: {
        Authorization: `Bearer ${tmpToken}`,
      },
      ...config,
      data,
    });
  } catch (error) {
    console.error(`error in api call2 : ${path}`, error);
  }
};

const refreshTokenFunc = async () => {
  const refreshToken = JSON.parse(await SecureStore.getItemAsync('refresh_TokenInfo')).refreshToken;

  console.log('refreshToken: ', refreshToken);

  return makeRequest(
    'post',
    'v1/auth/refresh',
    {
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
    },
    {
      jwt: refreshToken,
    }
  );
};

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

const getInvalidToken = async () => {
  console.log('getInvalidToken: ');

  const accessTokenInfo = JSON.parse(await SecureStore.getItemAsync('access_TokenInfo'));

  if (dateCheck(accessTokenInfo.accessTokenExpiredDate)) {
    console.log('엑세스 토큰 살아잇음');

    return accessTokenInfo.accessToken;
  } else {
    console.log('엑세스 토큰 죽음');
    const refreshTokenInfo = JSON.parse(await SecureStore.getItemAsync('refresh_TokenInfo'));

    if (dateCheck(refreshTokenInfo.refreshTokenExpiredDate)) {
      console.log('리프레시 토큰 살아있음');
      const newRefreshToken = await refreshTokenFunc();

      const tokenInfo = {
        accessToken: newRefreshToken.data.data.tokens.accessToken.jwtToken,
        accessTokenExpiryDate: newRefreshToken.data.data.tokens.accessToken.formattedExpiryDate,
        refreshToken: newRefreshToken.data.data.tokens.refreshToken.jwtToken,
        refreshTokenExpiryDate: newRefreshToken.data.data.tokens.refreshToken.formattedExpiryDate,
      };

      console.log('tokenInfo: ', tokenInfo);
      setTokenInSecure(tokenInfo);

      return newRefreshToken.data.data.tokens.accessToken.jwtToken;
    }
  }
};

export default getInvalidToken;
