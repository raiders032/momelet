import * as SecureStore from "expo-secure-store";
import axios from "axios";
import dateCheck from "./dateCheck";
import getEnvVars from "../enviroment";
const { apiUrl } = getEnvVars();
const makeRequest = async (method, path, config, data = "") => {
  let tmpToken;
  if (path === "v1/auth/refresh") {
    tmpToken = JSON.parse(await SecureStore.getItemAsync("refresh_TokenInfo"))
      .refreshToken;
  } else {
    tmpToken = await getInvalidToken();
  }

  try {
    return await axios({
      url: `${apiUrl}/api/${path}`,
      method: method,
      headers: {
        Authorization: `Bearer ${tmpToken}`,
      },
      ...config,
      data: data,
    });
  } catch (error) {
    console.error(`error in api call : ${path}`, error);
  }
};
const refreshTokenFunc = async () => {
  const refreshToken = JSON.parse(
    await SecureStore.getItemAsync("refresh_TokenInfo")
  ).refreshToken;
  return makeRequest(
    "post",
    "v1/auth/refresh",
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
    "access_TokenInfo",
    JSON.stringify({
      accessToken: tokenInfo.accessToken,
      accessTokenExpiredDate: tokenInfo.accessTokenExpiryDate,
    })
  );
  await SecureStore.setItemAsync(
    "refresh_TokenInfo",
    JSON.stringify({
      refreshToken: tokenInfo.refreshToken,
      refreshTokenExpiredDate: tokenInfo.refreshTokenExpiryDate,
    })
  );
};
const getInvalidToken = async () => {
  const accessTokenInfo = JSON.parse(
    await SecureStore.getItemAsync("access_TokenInfo")
  );
  if (dateCheck(accessTokenInfo.accessTokenExpiredDate)) {
    return accessTokenInfo.accessToken;
  } else {
    const refreshTokenInfo = JSON.parse(
      await SecureStore.getItemAsync("refresh_TokenInfo")
    );
    if (dateCheck(refreshTokenInfo.refreshTokenExpiredDate)) {
      console.log("Hello");
      const newRefreshToken = await refreshTokenFunc();
      const tokenInfo = {
        accessToken: newRefreshToken.data.data.tokens.accessToken.jwtToken,
        accessTokenExpiryDate:
          newRefreshToken.data.data.tokens.accessToken.formattedExpiryDate,
        refreshToken: newRefreshToken.data.data.tokens.refreshToken.jwtToken,
        refreshTokenExpiryDate:
          newRefreshToken.data.data.tokens.refreshToken.formattedExpiryDate,
      };
      setTokenInSecure(tokenInfo);
      return newRefreshToken.data.data.tokens.accessToken.jwtToken;
    }
  }
};
export default getInvalidToken;
