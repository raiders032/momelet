import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

// import getEnvVars from './enviroment';
import getInvalidToken from './utils/getInvalidToken';

// const { apiUrl } = getEnvVars();
// console.log(apiUrl);

const makeRequest = async (method, path, config, data = '') => {
  let tmpToken;

  // console.log(path);

  if (path === 'v1/auth/refresh') {
    tmpToken = JSON.parse(await SecureStore.getItemAsync('refresh_TokenInfo')).refreshToken;
  } else {
    tmpToken = await getInvalidToken();
  }

  try {
    const result = await axios({
      url: `http://ec2-3-34-162-241.ap-northeast-2.compute.amazonaws.com:8080/api/${path}`,
      method,
      headers: {
        Authorization: `Bearer ${tmpToken}`,
      },
      ...config,
      data,
    });

    return result;
  } catch (error) {
    // console.error(`error in api call1 : ${path}`, error);

    return error.response;
  }
};

export const apis = {
  getRestaurant: (latitude, longitude, id) =>
    makeRequest('get', `v1/restaurants/users/${id}/categories`, {
      params: { latitude, longitude, radius: 0.01 },
      // headers: {
      //   Authorization: `Bearer ${token}`,
      // },
    }),
  getUserMe: () => makeRequest('get', 'v1/users/me', {}),
  editUser: (id, categories, imageUrl, name, token) => {
    const body = new FormData();

    let photo;

    if (imageUrl) {
      photo = {
        name: `profileImage${id}.jpg`,
        type: 'image/jpeg',

        uri: imageUrl.replace('file://', ''),
      };
    } else {
      photo = null;
    }

    const categoryToString = categories.join();

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

    // console.log(refreshToken);

    return makeRequest(
      'post',
      'v1/auth/refresh-token',
      {},
      {
        jwt: refreshToken,
      }
    );
  },
};
