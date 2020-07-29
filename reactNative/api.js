import axios from "axios";

import getEnvVars from "./enviroment";
const { apiUrl } = getEnvVars();

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
    makeRequest(`/restaurant`, {
      params: { latitude, longitude, radius: 0.1 },
    }),
  getUserMe: (token) =>
    makeRequest("/user/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
};
