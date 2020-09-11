import { UndefinedTypeError, WrongTypeError } from "../Errors/TypeError.js";
import {
  UserNotFoundByIdError,
  UserNotFoundBySocketIdError,
  RoomNotFoundByRoomNameError,
  RoomNotExistError,
  RoomAlreadyExistError,
} from "../Errors/RepositoryError.js";
import {
  GameAlreadyStartedError,
  GameHostNotCorrectError,
  GetRestaurantCardError,
  NotEnoughRestaurantCardError,
} from "../Errors/GameError.js";
import logger from "../logger.js";

const errorMsg = {
  success: false,
  errorCode: null,
  data: null,
};
export const errorCheck = (callback) => {
  try {
    return callback();
  } catch (err) {
    if (err instanceof UndefinedTypeError) {
      logger.error(err);
      errorMsg.errorCode = err.errorCode;
    } else if (err instanceof WrongTypeError) {
      logger.error(err);
      errorMsg.errorCode = err.errorCode;
    } else if (err instanceof UserNotFoundByIdError) {
      logger.error(err);
      errorMsg.errorCode = err.errorCode;
    } else if (err instanceof UserNotFoundBySocketIdError) {
      logger.error(err);
      errorMsg.errorCode = err.errorCode;
    } else if (err instanceof RoomNotFoundByRoomNameError) {
      logger.error(err);
      errorMsg.errorCode = err.errorCode;
    } else if (err instanceof RoomNotExistError) {
      logger.error(err);
      errorMsg.errorCode = err.errorCode;
    } else if (err instanceof RoomAlreadyExistError) {
      logger.error(err);
      errorMsg.errorCode = err.errorCode;
    } else if (err instanceof GameAlreadyStartedError) {
      logger.error(err);
      errorMsg.errorCode = err.errorCode;
    } else if (err instanceof GameHostNotCorrectError) {
      logger.error(err);
      errorMsg.errorCode = err.errorCode;
    } else if (err instanceof GameHostNotCorrectError) {
      logger.error(err);
      errorMsg.errorCode = err.errorCode;
    } else if (err instanceof GetRestaurantCardError) {
      logger.error(err);
      errorMsg.errorCode = err.errorCode;
    } else if (err instanceof NotEnoughRestaurantCardError) {
      logger.error(err);
      errorMsg.errorCode = err.errorCode;
    } else {
      logger.error("Undefined Error");
      logger.error(err);
    }
    return errorMsg;
  }
};

export const errorCheckAsync = async (callback) => {
  try {
    return await callback();
  } catch (err) {
    if (err instanceof UndefinedTypeError) {
      logger.error(err);
      errorMsg.errorCode = err.errorCode;
    } else if (err instanceof WrongTypeError) {
      logger.error(err);
      errorMsg.errorCode = err.errorCode;
    } else if (err instanceof UserNotFoundByIdError) {
      logger.error(err);
      errorMsg.errorCode = err.errorCode;
    } else if (err instanceof UserNotFoundBySocketIdError) {
      logger.error(err);
      errorMsg.errorCode = err.errorCode;
    } else if (err instanceof RoomNotFoundByRoomNameError) {
      logger.error(err);
      errorMsg.errorCode = err.errorCode;
    } else if (err instanceof RoomNotExistError) {
      logger.error(err);
      errorMsg.errorCode = err.errorCode;
    } else if (err instanceof RoomAlreadyExistError) {
      logger.error(err);
      errorMsg.errorCode = err.errorCode;
    } else if (err instanceof GameAlreadyStartedError) {
      logger.error(err);
      errorMsg.errorCode = err.errorCode;
    } else if (err instanceof GameHostNotCorrectError) {
      logger.error(err);
      errorMsg.errorCode = err.errorCode;
    } else if (err instanceof GameHostNotCorrectError) {
      logger.error(err);
      errorMsg.errorCode = err.errorCode;
    } else if (err instanceof GetRestaurantCardError) {
      logger.error(err);
      errorMsg.errorCode = err.errorCode;
    } else if (err instanceof NotEnoughRestaurantCardError) {
      logger.error(err);
      errorMsg.errorCode = err.errorCode;
    } else {
      logger.error("Not caught Error");
      logger.error(err);
    }
    return errorMsg;
  }
};
