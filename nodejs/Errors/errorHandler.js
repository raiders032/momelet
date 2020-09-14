import { UndefinedTypeError, WrongTypeError } from "./TypeError.js";
import {
  UserNotFoundByIdError,
  UserNotFoundBySocketIdError,
  RoomNotFoundByRoomNameError,
  RoomNotExistError,
  RoomAlreadyExistError,
} from "./RepositoryError.js";
import {
  GameAlreadyStartedError,
  GameHostNotCorrectError,
  GetRestaurantCardError,
  NotEnoughRestaurantCardError,
  NotEnoughGameResultError,
} from "./GameError.js";
import logger from "../logger.js";

const errorMsg = {
  success: false,
  errorCode: null,
  data: null,
};
export const errorHandler = (callback) => {
  try {
    return callback();
  } catch (err) {
    logger.error(err.stack);
    if (err.errorCode !== undefined) {
      logger.error("Unexpected Error!!!");
      errorMsg.errorCode = err.errorCode;
    }
    return errorMsg;
  }
};

export const errorHandlerAsync = async (callback) => {
  try {
    return await callback();
  } catch (err) {
    logger.error(err.stack);
    if (err.errorCode !== undefined) {
      logger.error("Unexpected Error!!!");
      errorMsg.errorCode = err.errorCode;
    }
    return errorMsg;
  }
};
