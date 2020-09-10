// typeCheckObject 인자 예시
import { UndefinedTypeError, WrongTypeError } from "../Errors/TypeError.js";
let typeCheckObject = {
  number: [1, 2, undefined, 4],
  Array: [3, "hi", 1],
  string: ["hi", "bye"],
};

const temp = (typeCheckObject) => {
  let types = Object.keys(typeCheckObject);

  types.forEach((type) => {
    let values = typeCheckObject[type];

    values.forEach((value) => {
      console.log("value: " + value);
      if (value === undefined) throw new UndefinedTypeError();
      if (typeof value !== type)
        // if (typeof value !== type && type !== "Array")
        throw new WrongTypeError();
    });
  });
};

function temp2() {
  try {
    temp(typeCheckObject);
  } catch (err) {
    if (err instanceof UndefinedTypeError) {
      console.log("일!");
      console.log(err.message);
      console.log(err.errorCode);
    }
    if (err instanceof WrongTypeError) console.log("이!");
  }
}

temp2();
