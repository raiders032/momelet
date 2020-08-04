import axios from "axios";

import getEnvVars from "./enviroment";
const { apiUrl } = getEnvVars();
console.log(apiUrl);
const makeRequest = (path, config) => {
  return axios.get(
    // "http://www.naver.com"
    `${apiUrl}/api/v1${path}`,
    {
      ...config,
    }
  );
};
export const apis = {
  getRestaurant: (latitude, longitude) =>
    makeRequest(`/restaurants`, {
      params: { latitude, longitude, radius: 0.1 },
    }),
  getUserMe: (token) =>
    makeRequest("/users/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
};
