import axios from "axios";
import { ERR_RESTAURANT_GET_FAILED } from "../../Errors/GameError.js";
import * as SingleObject from "../../SingleObjects.js";
export default async (users, myId, radius, latitude, longitude) => {
  let id = "";
  for (let i = 0; i < users.length; i++) {
    if (i === users.length - 1) {
      id += users[i].id;
    } else {
      id += users[i].id + ",";
    }
  }
  const { JWT } = SingleObject.UserRepository.findById(myId);
  const cards = [];
  for (let i = 0; i < 3; i++) {
    try {
      const {
        data: {
          data: { restaurants },
        },
      } = await axios.get(process.env.SERVER_URL + "/api/v1/restaurants7", {
        headers: {
          Authorization: "Bearer " + JWT,
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
