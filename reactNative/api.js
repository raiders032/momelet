import axios from "axios";

import getEnvVars from "./enviroment";
const { apiUrl } = getEnvVars();
const makeRequest = async (method, path, config, data = "") => {
  try {
    return await axios({
      url: `${apiUrl}/api/${path}`,
      method: method,
      ...config,
      data: data,
    });
  } catch (error) {
    console.error("error in api call", error);
  }
};
export const apis = {
  getRestaurant: (latitude, longitude, id, token) =>
    makeRequest("get", `v2/restaurants/users/${id}/categories`, {
      params: { latitude, longitude, radius: 0.01 },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
  getUserMe: (token) =>
    makeRequest("get", "v1/users/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
  editUser: (id, categories, imageUrl, name, token) => {
    return makeRequest(
      "put",
      `v1/users/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
      { categories, imageUrl, name }
    );
  },
};
