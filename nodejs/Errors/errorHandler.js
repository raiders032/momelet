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
    if (err instanceof UndefinedTypeError) {
      logger.error(err.stack);
      errorMsg.errorCode = err.errorCode;
    } else if (err instanceof WrongTypeError) {
      logger.error(err.stack);
      errorMsg.errorCode = err.errorCode;
    } else if (err instanceof UserNotFoundByIdError) {
      logger.error(err.stack);
      errorMsg.errorCode = err.errorCode;
    } else if (err instanceof UserNotFoundBySocketIdError) {
      logger.error(err.stack);
      errorMsg.errorCode = err.errorCode;
    } else if (err instanceof RoomNotFoundByRoomNameError) {
      logger.error(err.stack);
      errorMsg.errorCode = err.errorCode;
    } else if (err instanceof RoomNotExistError) {
      logger.error(err.stack);
      errorMsg.errorCode = err.errorCode;
    } else if (err instanceof RoomAlreadyExistError) {
      logger.error(err.stack);
      errorMsg.errorCode = err.errorCode;
    } else if (err instanceof GameAlreadyStartedError) {
      logger.error(err.stack);
      errorMsg.errorCode = err.errorCode;
    } else if (err instanceof GameHostNotCorrectError) {
      logger.error(err.stack);
      errorMsg.errorCode = err.errorCode;
    } else if (err instanceof GameHostNotCorrectError) {
      logger.error(err.stack);
      errorMsg.errorCode = err.errorCode;
    } else if (err instanceof GetRestaurantCardError) {
      logger.error(err.stack);
      errorMsg.errorCode = err.errorCode;
    } else if (err instanceof NotEnoughRestaurantCardError) {
      logger.error(err.stack);
      errorMsg.errorCode = err.errorCode;
    } else if (err instanceof NotEnoughGameResultError) {
      logger.error(err.stack);
      errorMsg.errorCode = err.errorCode;
    } else {
      logger.error(err.stack);
    }
    return errorMsg;
  }
};

export const errorHandlerAsync = async (callback) => {
  try {
    return await callback();
  } catch (err) {
    if (err instanceof UndefinedTypeError) {
      logger.error(err.stack);
      errorMsg.errorCode = err.errorCode;
    } else if (err instanceof WrongTypeError) {
      logger.error(err.stack);
      errorMsg.errorCode = err.errorCode;
    } else if (err instanceof UserNotFoundByIdError) {
      logger.error(err.stack);
      errorMsg.errorCode = err.errorCode;
    } else if (err instanceof UserNotFoundBySocketIdError) {
      logger.error(err.stack);
      errorMsg.errorCode = err.errorCode;
    } else if (err instanceof RoomNotFoundByRoomNameError) {
      logger.error(err.stack);
      errorMsg.errorCode = err.errorCode;
    } else if (err instanceof RoomNotExistError) {
      logger.error(err.stack);
      errorMsg.errorCode = err.errorCode;
    } else if (err instanceof RoomAlreadyExistError) {
      logger.error(err.stack);
      errorMsg.errorCode = err.errorCode;
    } else if (err instanceof GameAlreadyStartedError) {
      logger.error(err.stack);
      errorMsg.errorCode = err.errorCode;
    } else if (err instanceof GameHostNotCorrectError) {
      logger.error(err.stack);
      errorMsg.errorCode = err.errorCode;
    } else if (err instanceof GameHostNotCorrectError) {
      logger.error(err.stack);
      errorMsg.errorCode = err.errorCode;
    } else if (err instanceof GetRestaurantCardError) {
      logger.error(err.stack);
      errorMsg.errorCode = err.errorCode;
    } else if (err instanceof NotEnoughRestaurantCardError) {
      logger.error(err.stack);
      errorMsg.errorCode = err.errorCode;
    } else if (err instanceof NotEnoughGameResultError) {
      logger.error(err.stack);
      errorMsg.errorCode = err.errorCode;
    } else {
      logger.error(err.stack);
    }
    return errorMsg;
  }
};
