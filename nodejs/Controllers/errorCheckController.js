import { UndefinedTypeError, WrongTypeError } from "../Errors/TypeError.js";
import logger from "../logger.js";

const errorMsg = {
  message: false,
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
    }
    return errorMsg;
  }
};
