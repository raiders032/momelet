const should = require("should");
const request = require("supertest");
const app = require("../app");
const ioClient = require("socket.io-client");
const ioOptions = require("./ioOptions");
const SingleObject = require("../SingleObjects");
const socket = require("../socket");

const disconnectAll = (senders) => {
  for (let i = 0; i < senders.length; i++) {
    senders[i].disconnect();
  }
};

const offEventAll = (event, senders) => {
  for (let i = 0; i < senders.length; i++) {
    senders[i].off(event);
  }
};

describe("Connecting Server", () => {
  let senders;
  let sender1;
  let sender2;
  let sender3;
  let sender4;
  let roomName;
  before(() => {
    sender1 = ioClient("http://localhost:3000", ioOptions[0]);
    sender2 = ioClient("http://localhost:3000", ioOptions[1]);
    sender3 = ioClient("http://localhost:3000", ioOptions[2]);
    sender4 = ioClient("http://localhost:3000", ioOptions[3]);
    senders = [sender1, sender2, sender3, sender4];
  });
  after(() => {
    app.server.close();
    disconnectAll(senders);
  });

  it("connect 테스트", (done) => {
    sender1.on("connect", () => {
      sender1.id.should.be.type("string");

      sender2.on("connect", () => {
        sender2.id.should.be.type("string");

        sender3.on("connect", () => {
          sender3.id.should.be.type("string");

          sender4.on("connect", () => {
            sender4.id.should.be.type("string");
            offEventAll("connect", senders);
            done();
          });
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
      }),
      (msg) => {
        msg.should.be.type("string");

        const msgObject = JSON.parse(msg);
        msgObject.should.have.property("aroundUsers");

        msgObject["aroundUsers"].length.should.equal(2);

        offEventAll("together", senders);
        done();
      }
    );
  });

  it("togetherInvite, togetherInvitation 테스트", (done) => {
    sender2.on("togetherInvitation", (msg) => {
      msg.should.be.type("string");

      const msgObject = JSON.parse(msg);

      // roomName, hostName 프로퍼티가 있는지 확인
      msgObject.should.have.properties("roomName", "hostName");

      // roomName이 "id"로 시작하는지 확인
      msgObject["roomName"].should.startWith(ioOptions[0].myId);

      // hostName이 제대로 들어왔는지 확인
      msgObject["hostName"].should.equal(ioOptions[0].query.name);

      roomName = msgObject["roomName"];

      offEventAll("togetherInvite", senders);
      offEventAll("togetherInvitation", senders);
      done();
    });

    sender1.emit(
      "togetherInvite",
      JSON.stringify({
        id: ioOptions[0].myId,
        inviteTheseUsers: [sender2.id, sender3.id],
      }),
      (msg) => {
        msg.should.be.type("string");

        const msgObject = JSON.parse(msg);

        // roomName 프로퍼티가 있는지, roomName이 "id"로 시작하는지 확인
        msgObject.should.have.property("roomName");
        msgObject["roomName"].should.startWith(ioOptions[0].myId);

        // gameRoomUserList가 길이가 1인지 확인
        msgObject.should.have.property("gameRoomUserList").with.lengthOf(1);

        // hostId가 내 id가 맞는지 확인
        msgObject["hostId"].should.equal(ioOptions[0].myId);
      }
    );
  });

  it("gameRoomJoin, gameRoomUpdate 테스트", (done) => {
    sender2.emit(
      "gameRoomJoin",
      JSON.stringify({
        id: ioOptions[1].myId,
        roomName,
      }),
      (msg) => {
        msg.should.be.type("string");

        const msgObject = JSON.parse(msg);
        msgObject.should.have.properties(
          "status",
          "roomName",
          "gameRoomUserList",
          "hostId"
        );
        msgObject["gameRoomUserList"].should.have.lengthOf(2);
      }
    );
    sender3.emit(
      "gameRoomJoin",
      JSON.stringify({
        id: ioOptions[2].myId,
        roomName,
      }),
      (msg) => {
        msg.should.be.type("string");

        const msgObject = JSON.parse(msg);
        msgObject.should.have.properties("gameRoomUserList", "hostId");
        msgObject["gameRoomUserList"].should.have.lengthOf(3);

        offEventAll("gameRoomJoin", senders);
        offEventAll("gameRoomUpdate", senders);
        done();
      }
    );
  });

  it("gameRoomLeave 테스트", (done) => {
    sender2.on("gameRoomUpdate", (msg) => {
      msg.should.be.type("string");

      const msgObject = JSON.parse(msg);
      msgObject.should.have.properties("gameRoomUserList", "hostId");
      msgObject.gameRoomUserList.should.have.lengthOf(2);
      msgObject.hostId.should.not.equal(ioOptions[0].myId);

      sender2.emit(
        "gameRoomLeave",
        JSON.stringify({
          id: ioOptions[1].myId,
          roomName,
        }),
        (msg) => {
          msg.should.be.type("string");
          let msgObject = JSON.parse(msg);

          msgObject.should.have.property("status").with.equal("ok");
          SingleObject.RoomRepository.findByRoomName(roomName).should.not.equal(
            false
          );
        }
      );
    });

    let updateCount = 0;
    sender3.on("gameRoomUpdate", (msg) => {
      updateCount += 1;
      msg.should.be.type("string");

      const msgObject = JSON.parse(msg);
      msgObject.should.have.properties("gameRoomUserList", "hostId");
      if (updateCount === 1) {
        msgObject.gameRoomUserList.should.have.lengthOf(2);
        msgObject.hostId.should.not.equal(ioOptions[0].myId);
      } else {
        msgObject.gameRoomUserList.should.have.lengthOf(1);
        msgObject.hostId.should.not.equal(ioOptions[1].myId);
        msgObject.hostId.should.equal(ioOptions[2].myId);

        sender3.emit(
          "gameRoomLeave",
          JSON.stringify({ id: ioOptions[2].myId, roomName }),
          (msg) => {
            msg.should.be.type("string");
            let msgObject = JSON.parse(msg);

            msgObject.should.have.property("status").with.equal("ok");

            SingleObject.RoomRepository.findByRoomName(roomName).should.equal(
              false
            );
            offEventAll("gameRoomUpdate", senders);
            done();
          }
        );
      }
    });

    sender1.emit(
      "gameRoomLeave",
      JSON.stringify({
        id: ioOptions[0].myId,
        roomName,
      }),
      (msg) => {
        msg.should.be.type("string");
        let msgObject = JSON.parse(msg);

        msgObject.should.have.property("status").with.equal("ok");
        SingleObject.RoomRepository.findByRoomName(roomName).should.not.equal(
          false
        );
      }
    );
  });

  it("gameStart 테스트 - 방장이 아닌 사람이 스타트했을 때", (done) => {
    //given
    sender1.emit(
      "togetherInvite",
      JSON.stringify({
        id: ioOptions[0].myId,
        inviteTheseUsers: [sender2.id, sender3.id],
      }),
      (msg) => {
        msg.should.be.type("string");
        const msgObject = JSON.parse(msg);
        msgObject.should.have.property("roomName");
        msgObject["roomName"].should.startWith(ioOptions[0].myId);
        msgObject.should.have.property("gameRoomUserList").with.lengthOf(1);
        msgObject["hostId"].should.equal(ioOptions[0].myId);

        roomName = msgObject["roomName"];
        sender2.emit(
          "gameRoomJoin",
          JSON.stringify({
            id: ioOptions[1].myId,
            roomName,
          }),
          (msg) => {
            msg.should.be.type("string");
            const msgObject = JSON.parse(msg);
            msgObject.should.have.properties(
              "status",
              "roomName",
              "gameRoomUserList",
              "hostId"
            );
            msgObject["gameRoomUserList"].should.have.lengthOf(2);
            sender3.emit(
              "gameRoomJoin",
              JSON.stringify({
                id: ioOptions[2].myId,
                roomName,
              }),
              (msg) => {
                msg.should.be.type("string");

                const msgObject = JSON.parse(msg);
                msgObject.should.have.properties("gameRoomUserList", "hostId");
                msgObject["gameRoomUserList"].should.have.lengthOf(3);

                // when
                sender2.emit(
                  "gameStart",
                  JSON.stringify({
                    id: ioOptions[1].myId,
                    roomName,
                  }),
                  (msg) => {
                    // then
                    msg.should.be.type("string");
                    const msgObject = JSON.parse(msg);
                    msgObject.should.have.property("status").with.equal("fail");

                    offEventAll("gameStart", senders);
                    done();
                  }
                );
              }
            );
          }
        );
      }
    );
  });

  it("gameStart 테스트 - 방장이 스타트했을 때", (done) => {
    sender2.on("gameStart", (msg) => {
      msg.should.be.type("string");
      const msgObject = JSON.parse(msg);
      msgObject.should.have.properties("status", "restaurants");
      msgObject.status.should.equal("ok");
      msgObject.restaurants.should.have.lengthOf(7);
    });
    sender3.on("gameStart", (msg) => {
      msg.should.be.type("string");
      const msgObject = JSON.parse(msg);
      msgObject.should.have.properties("status", "restaurants");
      msgObject.status.should.equal("ok");
      msgObject.restaurants.should.have.lengthOf(7);
    });
    sender1.emit(
      "gameStart",
      JSON.stringify({
        id: ioOptions[0].myId,
        roomName,
      }),
      (msg) => {
        msg.should.be.type("string");
        const msgObject = JSON.parse(msg);
        msgObject.should.have.properties("status", "restaurants");
        msgObject.status.should.equal("ok");
        msgObject.restaurants.should.have.lengthOf(7);

        offEventAll("gameStart", senders);
        done();
      }
    );
  });
});
