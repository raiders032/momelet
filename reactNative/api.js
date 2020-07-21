import axios from "axios";

const makeRequest = (path, config) => {
  return axios.get(
    // "http://www.naver.com"
    `http://ec2-13-125-90-157.ap-northeast-2.compute.amazonaws.com:8080/api/v1${path}`,
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
};
