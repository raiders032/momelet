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
  before(() => {
    sender1 = ioClient("http://localhost:3000", ioOptions[0]);
    sender2 = ioClient("http://localhost:3000", ioOptions[1]);
    sender3 = ioClient("http://localhost:3000", ioOptions[2]);
  });
  after(() => {
    disconnectAll(sender1, sender2, sender3);
  });

  it("connect 테스트", (done) => {
    sender1.on("connect", () => {
      sender1.id.should.be.type("string");

      sender2.on("connect", () => {
        sender2.id.should.be.type("string");

        sender3.on("connect", () => {
          sender3.id.should.be.type("string");
          done();
        });
      });
    });
  });
  it("together 테스트", (done) => {
    sender1.emit(
      "together",
      JSON.stringify({
        id: ioOptions[0]["query"]["id"],
        latitude: ioOptions[0]["query"]["latitude"],
        longitude: ioOptions[0]["query"]["longitude"],
      })
    );

    sender1.on("together", (msg) => {
      msg.should.be.type("string");

      msgObject = JSON.parse(msg);
      msgObject.should.have.property("aroundUsers");

      msgObject["aroundUsers"].length.should.not.equal(0);
      done();
    });
  });

  it("togetherInvite, togetherInvitation 테스트", (done) => {
    sender1.emit(
      "togetherInvite",
      JSON.stringify({
        id: ioOptions[0].myId,
        inviteTheseUsers: [sender2.id, sender3.id],
      })
    );

    sender1.on("togetherInvite", (msg) => {
      msg.should.be.type("string");

      msgObject = JSON.parse(msg);

      // roomName 프로퍼티가 있는지, roomName이 "id"로 시작하는지 확인
      msgObject.should.have.property("roomName");
      msgObject["roomName"].should.startWith(ioOptions[0].myId);

      // gameRoomUserList가 길이가 1인지 확인
      msgObject.should.have.property("gameRoomUserList").with.lengthOf(1);

      // hostId가 내 id가 맞는지 확인
      msgObject["hostId"].should.equal(ioOptions[0].myId);
    });

    sender2.on("togetherInvitation", (msg) => {
      msg.should.be.type("string");

      msgObject = JSON.parse(msg);

      // roomName, hostName 프로퍼티가 있는지 확인
      msgObject.should.have.property("roomName");
      msgObject.should.have.property("hostName");

      // roomName이 "id"로 시작하는지 확인
      msgObject["roomName"].should.startWith(ioOptions[0].myId);

      // hostName이 제대로 들어왔는지 확인
      msgObject["hostName"].should.equal(ioOptions[0].query.name);
      done();
    });
  });
});
