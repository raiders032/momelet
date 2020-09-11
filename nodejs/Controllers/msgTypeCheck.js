/* 
typeCheckObject 인자 예시
let typeCheckObject = {
  number: [1, 2, undefined, 4],
  Array: [[3, "hi", 1]],
  string: ["hi", "bye"],
};
*/
import { UndefinedTypeError, WrongTypeError } from "../Errors/TypeError.js";
export default (typeCheckingObject) => {
  let types = Object.keys(typeCheckingObject);

  types.forEach((type) => {
    let values = typeCheckingObject[type];

    values.forEach((value) => {
      if (value === undefined) throw new UndefinedTypeError();
      if (typeof value !== type && type !== "Array") throw new WrongTypeError();
    });
  });
};
