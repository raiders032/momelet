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
  let roomName;
  let senders = [];
  before(() => {
    for (let i = 0; i < ioOptions.length; i++) {
      senders.push(ioClient("http://localhost:3000", ioOptions[i]));
    }
  });
  after(() => {
    app.server.close();
    disconnectAll(senders);
  });

  it("connect 테스트", (done) => {
    senders[0].on("connect", () => {
      senders[0].id.should.be.type("string");

      senders[1].on("connect", () => {
        senders[1].id.should.be.type("string");

        senders[2].on("connect", () => {
          senders[2].id.should.be.type("string");

          senders[3].on("connect", () => {
            senders[3].id.should.be.type("string");
            offEventAll("connect", senders);
            done();
          });
        });
      });
    });
  });
  it("together 테스트", (done) => {
    senders[0].emit(
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
    senders[1].on("togetherInvitation", (msg) => {
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

    senders[0].emit(
      "togetherInvite",
      JSON.stringify({
        id: ioOptions[0].myId,
        inviteTheseUsers: [senders[1].id, senders[2].id],
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
    senders[1].emit(
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
    senders[2].emit(
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
    senders[1].on("gameRoomUpdate", (msg) => {
      msg.should.be.type("string");

      const msgObject = JSON.parse(msg);
      msgObject.should.have.properties("gameRoomUserList", "hostId");
      msgObject.gameRoomUserList.should.have.lengthOf(2);
      msgObject.hostId.should.not.equal(ioOptions[0].myId);

      senders[1].emit(
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
    senders[2].on("gameRoomUpdate", (msg) => {
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

        senders[2].emit(
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

    senders[0].emit(
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
    senders[0].emit(
      "togetherInvite",
      JSON.stringify({
        id: ioOptions[0].myId,
        inviteTheseUsers: [senders[1].id, senders[2].id],
      }),
      (msg) => {
        msg.should.be.type("string");
        const msgObject = JSON.parse(msg);
        msgObject.should.have.property("roomName");
        msgObject["roomName"].should.startWith(ioOptions[0].myId);
        msgObject.should.have.property("gameRoomUserList").with.lengthOf(1);
        msgObject["hostId"].should.equal(ioOptions[0].myId);

        roomName = msgObject["roomName"];
        senders[1].emit(
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
            senders[2].emit(
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
                senders[1].emit(
                  "gameStart",
                  JSON.stringify({
                    id: ioOptions[1].myId,
                    roomName,
                  }),
                  (msg) => {
                    // then
                    msg.should.be.type("string");
                    const msgObject = JSON.parse(msg);
                    msgObject.should.have.property("status").with.equal("no");

                    SingleObject.RoomRepository.findByRoomName(roomName)
                      .getIsStarted()
                      .should.equal(false);
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
    senders[1].on("gameStart", (msg) => {
      msg.should.be.type("string");
      const msgObject = JSON.parse(msg);
      msgObject.should.have.properties("status", "restaurants");
      msgObject.status.should.equal("ok");
      msgObject.restaurants.should.have.lengthOf(7);
      senders[1].off("gameStart");
    });
    senders[2].on("gameStart", (msg) => {
      msg.should.be.type("string");
      const msgObject = JSON.parse(msg);
      msgObject.should.have.properties("status", "restaurants");
      msgObject.status.should.equal("ok");
      msgObject.restaurants.should.have.lengthOf(7);
      senders[2].off("gameStart");
      done();
    });
    senders[0].emit(
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

        SingleObject.RoomRepository.findByRoomName(roomName)
          .getIsStarted()
          .should.equal(true);
      }
    );
  });

  it("gameUserFinish 테스트", (done) => {
    for (let i = 0; i < 2; i++) {
      senders[i].emit(
        "gameUserFinish",
        JSON.stringify({
          id: ioOptions[i].myId,
          userGameResult: [
            {
              id: 1,
              sign: "y",
            },
            {
              id: 2,
              sign: "y",
            },
            {
              id: 3,
              sign: "y",
            },
            {
              id: 4,
              sign: "n",
            },
            {
              id: 5,
              sign: "n",
            },
            {
              id: 6,
              sign: "s",
            },
            {
              id: 7,
              sign: "s",
            },
          ],
        }),
        (msg) => {
          msg.should.be.type("string");
          const msgObject = JSON.parse(msg);
          msgObject.should.have.property("status").with.equal("wait");
        }
      );
    }

    senders[2].emit(
      "gameUserFinish",
      JSON.stringify({
        id: ioOptions[2].myId,
        userGameResult: [
          {
            id: 1,
            sign: "y",
          },
          {
            id: 2,
            sign: "y",
          },
          {
            id: 3,
            sign: "y",
          },
          {
            id: 4,
            sign: "n",
          },
          {
            id: 5,
            sign: "n",
          },
          {
            id: 6,
            sign: "s",
          },
          {
            id: 7,
            sign: "s",
          },
        ],
        roomName,
      }),
      (msg) => {
        msg.should.be.type("string");
        const msgObject = JSON.parse(msg);
        msgObject.should.have.property("status").with.equal("wait");

        done();
      }
    );
  });
});
