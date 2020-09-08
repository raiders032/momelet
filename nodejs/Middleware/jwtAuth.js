import axios from "axios";
import logger from "../logger.js";

export default async (req, res, next) => {
  const token = req.body;
  console.log("어케 통과했니");
  try {
    const {
      data: { success },
    } = await axios.post(process.env.SERVER_URL + "/api/v1/auth/validation", {
      jwt: token,
    });

    if (success === false) {
      return res.status(401).send("unknown token");
    }
    next();
  } catch (err) {
    logger.error("jwt auth error: " + err);
  }
  next();
};
