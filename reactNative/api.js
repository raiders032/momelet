import axios from "axios";

import getEnvVars from "./enviroment";
const { apiUrl } = getEnvVars();
const makeRequest = async (method, path, config, data = "") => {
  try {
    return await axios({
      url: `${apiUrl}/api/v1${path}`,
      method: method,
      ...config,
      data: data,
    });
  } catch (error) {
    console.error("error in api call", error);
  }
};
export const apis = {
  getRestaurant: (latitude, longitude) =>
    makeRequest("get", `/restaurants`, {
      params: { latitude, longitude, radius: 0.1 },
    }),
  getUserMe: (token) =>
    makeRequest("get", "/users/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
  editUser: (id, categories, imageUrl, name, token) => {
    return makeRequest(
      "put",
      `/users/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
      { categories, imageUrl, name }
    );
  },
};
