// typeCheckObject 인자 예시
import { UndefinedTypeError, WrongTypeError } from "../Errors/TypeError.js";

class typeCheckObject {
  constructor(numbers, arrays, strings) {
    this.number = numbers;
    this.array = arrays;
    this.string = strings;
  }
}
let obj = new typeCheckObject([1, 2, 3, 4], [[3, "hi", 1]], ["hi", "bye"]);

const temp = (typeCheckObject) => {
  let types = Object.keys(typeCheckObject);

  types.forEach((type) => {
    let values = typeCheckObject[type];
    console.log("검사할 타입: " + type);
    values.forEach((value) => {
      console.log("value: " + value);
      console.log("typeof value: " + typeof value);
      if (value === undefined) throw new UndefinedTypeError();
      if (typeof value !== type && type !== "array")
        // if (typeof value !== type && type !== "Array")
        throw new WrongTypeError();
    });
  });
};

function temp2(obj) {
  try {
    temp(obj);
  } catch (err) {
    if (err instanceof UndefinedTypeError) {
      console.log("일!");
      console.log(err.message);
      console.log(err.errorCode);
    }
    if (err instanceof WrongTypeError) {
      console.log("이!");
      console.log(err.message);
      console.log(err.errorCode);
    }
  }
}

console.log(obj);
temp2(obj);
