const func1 = async () => {
  throw new Error("에러다 이새기야");
};

const func2 = () => {
  throw new Error("이것도 에러");
};

(async () => {
  try {
    await func1();
  } catch (e) {
    console.log("에러 잡았다");
    console.log(e);
  }
})();

(() => {
  try {
    func2();
  } catch (e) {
    console.log("에러 또 잡았따");
    console.log(e);
  }
})();
