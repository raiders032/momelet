const should = require("should");
const request = require("supertest");
// const app = require("../app");
const ioClient = require("socket.io-client");
const ioOptions = require("./ioOptions");

const disconnectAll = (user1, user2, user3) => {
  user1.disconnect();
  user2.disconnect();
  user3.disconnect();
};

// 서버 키고 테스트할 것.
describe("Conneting Server", () => {
  let sender1;
  let sender2;
  let sender3;
  beforeEach(() => {
    sender1 = ioClient("http://localhost:3000", ioOptions[0]);
    sender2 = ioClient("http://localhost:3000", ioOptions[1]);
    sender3 = ioClient("http://localhost:3000", ioOptions[2]);
  });
  it("together 테스트", (done) => {
    sender1.on("together", (msg) => {
      msg.should.be.type("string");

      msgObject = JSON.parse(msg);
      msgObject.should.have.property("aroundUsers");

      msgObject["aroundUsers"].length.should.not.equal(0);
      disconnectAll(sender1, sender2, sender3);
      done();
    });

    sender1.emit(
      "together",
      JSON.stringify({
        id: ioOptions[0]["query"]["id"],
        latitude: ioOptions[0]["query"]["latitude"],
        longitude: ioOptions[0]["query"]["longitude"],
      })
    );
  });
});
