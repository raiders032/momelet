const assert = require("assert"); // 노드 기본 모듈
const should = require("should"); // 더 읽기 쉬워서 이걸 더 많이 씀.
/*
 ** describe(string, func)
 ** 첫 번째 인자는 어떤 것을 테스트할지에 대해서 적는 것. 적고 싶은대로 적어.
 ** 두 번째 인자는 함수를 적어. 이 함수에다가 테스트 코드를 쓴다.
 **
 ** it(string, func)
 ** 테스트코드는 it이라는 함수를 쓴다. 모카가 가지고 있는 함수임.
 ** 실제 여기서 검증하는 작업을 해야 한다.
 */
describe("GET /users", () => {
  it("배열을 반환한다", () => {
    // 같으면 통과. 다르면 예외를 던진다.
    // assert.equal(1, 1);

    (1).should.equal(1);
  });
});
