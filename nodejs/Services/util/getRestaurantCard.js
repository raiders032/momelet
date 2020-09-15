import axios from "axios";
import { ERR_RESTAURANT_GET_FAILED } from "../../Errors/GameError.js";

export default async (users, myId, radius, latitude, longitude, jwt) => {
  let id = "";
  for (let i = 0; i < users.length; i++) {
    if (i === users.length - 1) {
      id += users[i].id;
    } else {
      id += users[i].id + ",";
    }
  }
  const cards = [];
  for (let i = 0; i < 3; i++) {
    try {
      const {
        data: {
          data: { restaurants },
        },
      } = await axios.get(process.env.SERVER_URL + "/api/v1/restaurants7", {
        headers: {
          Authorization: "Bearer " + jwt,
        },
        params: {
          id,
          longitude,
          latitude,
          radius,
        },
      });
      for (let j in restaurants) {
        cards.push(restaurants[j]);
      }
      break;
    } catch (err) {
      // 0.15초 간격으로 3번까지 재요청
      if (i < 2) {
        await (() => {
          return new Promise((resolve) => {
            setTimeout(resolve, 150);
          });
        });
        continue;
      }
      throw new ERR_RESTAURANT_GET_FAILED();
    }
  }
  return cards;
};
