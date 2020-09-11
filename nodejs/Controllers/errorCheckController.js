import { UndefinedTypeError, WrongTypeError } from "../Errors/TypeError.js";
import {
  UserNotFoundByIdError,
  UserNotFoundBySocketIdError,
  RoomNotFoundByRoomNameError,
  RoomNotExistError,
  RoomAlreadyExistError,
} from "../Errors/RepositoryError.js";

import logger from "../logger.js";

const errorMsg = {
  success: false,
  errorCode: null,
  data: null,
};
export default (callback) => {
  try {
    return callback();
  } catch (err) {
    if (err instanceof UndefinedTypeError) {
      logger.error(err);
      errorMsg.errorCode = err.errorCode;
    } else if (err instanceof WrongTypeError) {
      logger.error(err);
      errorMsg.errorCode = err.errorCode;
    } else if (UserNotFoundByIdError) {
      logger.error(err);
      errorMsg.errorCode = err.errorCode;
    } else if (UserNotFoundBySocketIdError) {
      logger.error(err);
      errorMsg.errorCode = err.errorCode;
    } else if (RoomNotFoundByRoomNameError) {
      logger.error(err);
      errorMsg.errorCode = err.errorCode;
    } else if (RoomNotExistError) {
      logger.error(err);
      errorMsg.errorCode = err.errorCode;
    } else if (RoomAlreadyExistError) {
      logger.error(err);
      errorMsg.errorCode = err.errorCode;
    } else {
      logger.error("Undefined Error");
      logger.error(err);
    }

    return errorMsg;
  }
};
