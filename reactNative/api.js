import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

import getEnvVars from './enviroment';
import getInvalidToken from './utils/getInvalidToken';

const { apiUrl } = getEnvVars();

const makeRequest = async (method, path, config, data = '') => {
  let tmpToken;

  console.log(path);
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
    console.error(`error in api call1 : ${path}`, error);
  }
};

export const apis = {
  getRestaurant: (latitude, longitude, id, token) =>
    makeRequest('get', `v2/restaurants/users/${id}/categories`, {
      params: { latitude, longitude, radius: 0.01 },
      // headers: {
      //   Authorization: `Bearer ${token}`,
      // },
    }),
  getUserMe: (token) => makeRequest('get', 'v1/users/me', {}),
  editUser: (id, categories, imageUrl, name, token) => {
    const body = new FormData();

    const photo = {
      name: `profileImage${id}.jpg`,
      type: 'image/jpeg',

      uri: imageUrl.replace('file://', ''),
    };
    const categoryToString = categories.join();

    // console.log(categoryToString);
    body.append('categories', categoryToString);
    body.append('name', name);
    body.append('imageFile', photo);
    // body.append("imageFile", null);
    // console.log(body);

    return makeRequest('post', `v1/users/${id}`, {}, body);
  },
  refreshToken: async () => {
    const refreshToken = JSON.parse(await SecureStore.getItemAsync('refresh_TokenInfo'))
      .refreshToken;

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
  },
};
