const should = require("should");
const request = require("supertest");
const express = require("express");

// 테스트 환경 만들어 두기
const app = express();
const users = [{ name: "Alice" }];
app.get("/", (req, res) => res.send("Hello World!"));
app.get("/users", (req, res) => res.json(users));

/*
 ** 테스트코드
 ** request(app)
 ** 서버를 자동으로 띄우고 있음.
 */

describe("GET /users", () => {
  // done은 자동으로 모카가 넣어주는 함수
  it("배열을 반환한다", (done) => {
    request(app) // 서버가 띄워짐
      .get("/users") // get 요청
      .end((err, res) => {
        // 비동기로 처리됨
        if (err) throw err;
        res.body.should.be.instanceof(Array);
        res.body.forEach((user) => {
          user.should.have.property("name");
        });
        done(); // 테스트가 끝났다는 것을 모카에 알려주는 함수.
      });
  });
});
