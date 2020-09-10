// typeCheckObject 인자 예시
import {
  ResourceNotFoundError1,
  ResourceNotFoundError2,
} from "../Errors/ResourceNotFoundError.js";
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
      if (value === undefined) throw new ResourceNotFoundError1();
      if (typeof value !== type)
        // if (typeof value !== type && type !== "Array")
        throw new ResourceNotFoundError2();
    });
  });
};

function temp2() {
  try {
    temp(typeCheckObject);
  } catch (err) {
    if (err instanceof ResourceNotFoundError1) console.log("일!");
    if (err instanceof ResourceNotFoundError2) console.log("이!");
  }
}

temp2();
