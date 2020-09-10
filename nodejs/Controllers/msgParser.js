// typeCheckObject 인자 예시
// let typeCheckObject = {
//   number: [1, 2, undefined, 4],
//   Array: [3, "hi", 1],
//   string: ["hi", "bye"],
// };

export default (typeCheckObject) => {
  let types = Object.keys(typeCheckObject);

  types.forEach((type) => {
    let values = typeCheckObject[type];

    values.forEach((value) => {
      if (value === undefined) throw new ResourceNotFoundError1();
      if (typeof value !== type && type !== "Array")
        throw new ResourceNotFoundError2();
    });
  });
};
