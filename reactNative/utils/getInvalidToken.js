import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

import getEnvVars from '../enviroment';
import dateCheck from './dateCheck';

const { apiUrl } = getEnvVars();

const getAccessToken = async () => {
  const token = await SecureStore.getItemAsync('refresh_TokenInfo').refreshToken;

  return JSON.parse(token);
};

const makeRequest = async (method, path, data = '') => {
  try {
    return await axios({
      url: `${apiUrl}/api/${path}`,
      method,
      data,
    });
  } catch (error) {
    // console.log(error.response);
    // console.error(`error in api call2 : ${path}`, error);
  }
};

const refreshTokenFunc = async () => {
  const refreshToken = JSON.parse(await SecureStore.getItemAsync('refresh_TokenInfo')).refreshToken;

  // console.log('refreshToken: ', refreshToken);

  return makeRequest('post', 'v1/auth/access-token', {
    jwt: refreshToken,
  });
};

const setTokenInSecure = async (tokenInfo) => {
  await SecureStore.setItemAsync(
    'access_TokenInfo',
    JSON.stringify({
      accessToken: tokenInfo.accessToken,
      accessTokenExpiredDate: tokenInfo.accessTokenExpiryDate,
    })
  );
};

const getInvalidToken = async () => {
  const accessTokenInfo = JSON.parse(await SecureStore.getItemAsync('access_TokenInfo'));

  if (dateCheck(accessTokenInfo.accessTokenExpiredDate)) {
    // console.log('엑세스 토큰 살아잇음');

    return accessTokenInfo.accessToken;
  } else {
    // console.log('엑세스 토큰 죽음');

    const refreshTokenInfo = JSON.parse(await SecureStore.getItemAsync('refresh_TokenInfo'));

    if (dateCheck(refreshTokenInfo.refreshTokenExpiredDate)) {
      // console.log('리프레시 토큰 살아있음');

      const newRefreshToken = await refreshTokenFunc();

      const tokenInfo = {
        accessToken: newRefreshToken.data.data.accessToken.jwtToken,
        accessTokenExpiryDate: newRefreshToken.data.data.accessToken.formattedExpiryDate,
      };

      setTokenInSecure(tokenInfo);

      return newRefreshToken.data.data.accessToken.jwtToken;
    }
  }
};

export default getInvalidToken;
