import should from "should";
import request from "supertest";
import app from "../app.js";
import ioClient from "socket.io-client";
import ioOptions from "./ioOptions.js";
import * as SingleObject from "../SingleObjects.js";
import socket from "../socket.js";

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
const checkMsgOutline = (msgObject) => {
  msgObject.should.have.properties("success", "errorCode", "data");
  msgObject["success"].should.equal(true);
  should.not.exist(msgObject["errorCode"]);
};

describe("Connecting Server", () => {
  let roomName;
  let senders = [];
  let restaurantsId = [];
  before(() => {
    for (let i = 0; i < ioOptions.length; i++) {
      senders.push(ioClient("http://localhost:3000", ioOptions[i]));
    }
  });
  after(() => {
    app.get("server").close();
    disconnectAll(senders);
  });

  it("connect 테스트", (done) => {
    for (let i = 0; i < ioOptions.length; i++) {
      senders[i].on("connect", () => {
        senders[i].id.should.be.type("string");
        if (i === ioOptions.length - 1) done();
      });
    }
    // senders[0].on("connect", () => {
    //   senders[0].id.should.be.type("string");
    //   senders[1].on("connect", () => {
    //     senders[1].id.should.be.type("string");
    //     senders[2].on("connect", () => {
    //       senders[2].id.should.be.type("string");
    //       senders[3].on("connect", () => {
    //         senders[3].id.should.be.type("string");
    //         offEventAll("connect", senders);
    //         done();
    //       });
    //     });
    //   });
    // });
  });
  it("together 테스트", (done) => {
    // 0이 together를 보내면
    // 알맞은 값을 받음
    senders[0].emit(
      "together",
      JSON.stringify({
        id: ioOptions[0]["query"]["id"],
        latitude: ioOptions[0]["query"]["latitude"],
        longitude: ioOptions[0]["query"]["longitude"],
      }),
      (msg) => {
        msg.should.be.type("string");

        const parsedMsg = JSON.parse(msg);
        checkMsgOutline(parsedMsg);
        const msgObject = parsedMsg["data"];
        const aroundUsers = msgObject.aroundUsers;
        aroundUsers.should.have.length(2);

        offEventAll("together", senders);
        done();
      }
    );
  });

  it("togetherInvite, togetherInvitation 테스트", (done) => {
    // 0이 초대메시지를 보내면
    // 1이 받음
    senders[1].on("togetherInvitation", (msg) => {
      msg.should.be.type("string");

      const parsedMsg = JSON.parse(msg);
      checkMsgOutline(parsedMsg);

      const msgObject = parsedMsg["data"];

      msgObject.should.have.properties("roomName", "hostId");
      msgObject["roomName"].should.startWith(ioOptions[0].myId);
      msgObject["hostId"].should.equal(ioOptions[0].myId);

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

        const parsedMsg = JSON.parse(msg);
        checkMsgOutline(parsedMsg);

        const msgObject = parsedMsg["data"];
        msgObject.should.have.properties(
          "roomName",
          "gameRoomUserList",
          "hostId"
        );
        msgObject["roomName"].should.startWith(ioOptions[0].myId);

        // gameRoomUserList가 길이가 1인지 확인
        msgObject.should.have.property("gameRoomUserList").with.lengthOf(1);

        // hostId가 내 id가 맞는지 확인
        msgObject["hostId"].should.equal(ioOptions[0].myId);

        // 내가 알맞은 방에 접속했는지 확인
        let roomName = msgObject["roomName"];
        let room = SingleObject.RoomRepository.findByRoomName(roomName);
        room.findUserById(ioOptions[0].myId).should.equal(true);
      }
    );
  });

  it("gameRoomJoin, gameRoomUpdate 테스트", (done) => {
    // 1이 방에 입장하고 0이 gameRoomUpdate를 받고
    // 2가 방에 입장하고 0, 1이 gameRoomUpdate를 받음
    let updateCount = 0;
    senders[0].on("gameRoomUpdate", (msg) => {
      updateCount += 1;
      msg.should.be.type("string");

      const parsedMsg = JSON.parse(msg);
      checkMsgOutline(parsedMsg);

      const msgObject = parsedMsg["data"];
      if (updateCount == 1) {
        msgObject.should.have
          .property("gameRoomUserList")
          .with.have.lengthOf(2);
      } else if (updateCount == 2) {
        msgObject.should.have
          .property("gameRoomUserList")
          .with.have.lengthOf(3);
      }
    });
    senders[1].emit(
      "gameRoomJoin",
      JSON.stringify({
        id: ioOptions[1].myId,
        roomName,
      }),
      (msg) => {
        msg.should.be.type("string");

        const parsedMsg = JSON.parse(msg);
        checkMsgOutline(parsedMsg);

        const msgObject = parsedMsg["data"];
        msgObject.should.have.properties(
          "roomName",
          "gameRoomUserList",
          "hostId"
        );
        msgObject["gameRoomUserList"].should.have.lengthOf(2);

        senders[1].on("gameRoomUpdate", (msg) => {
          msg.should.be.type("string");

          const msgObject = JSON.parse(msg);
          checkMsgOutline(msgObject);
          msgObject.should.have
            .property("gameRoomUserList")
            .with.have.lengthOf(3);
        });

        senders[2].emit(
          "gameRoomJoin",
          JSON.stringify({
            id: ioOptions[2].myId,
            roomName,
          }),
          (msg) => {
            msg.should.be.type("string");

            const parsedMsg = JSON.parse(msg);
            checkMsgOutline(parsedMsg);

            const msgObject = parsedMsg["data"];
            msgObject.should.have.properties("gameRoomUserList", "hostId");
            msgObject["gameRoomUserList"].should.have.lengthOf(3);

            offEventAll("gameRoomJoin", senders);
            offEventAll("gameRoomUpdate", senders);
            done();
          }
        );
      }
    );
  });

  it("gameRoomLeave 테스트", (done) => {
    // 0이 먼저 방에서 나가면
    // 1, 2가 gameRoomUpdate를 받고 1은 방장이 되고
    // 1이 방을 나가면 2만 gameRoomUpdate를 받고 2가 방장이 되고
    // 2가 방을 나가면 방이 삭제됨
    senders[1].on("gameRoomUpdate", (msg) => {
      msg.should.be.type("string");

      const parsedMsg = JSON.parse(msg);
      checkMsgOutline(parsedMsg);

      const msgObject = parsedMsg["data"];
      msgObject.should.have.properties("gameRoomUserList", "hostId");
      msgObject.gameRoomUserList.should.have.lengthOf(2);
      msgObject.hostId.should.not
        .equal(ioOptions[0].myId)
        .with.equal(ioOptions[1].myId);

      senders[1].emit(
        "gameRoomLeave",
        JSON.stringify({
          id: ioOptions[1].myId,
          roomName,
        }),
        (msg) => {
          msg.should.be.type("string");

          const parsedMsg = JSON.parse(msg);
          checkMsgOutline(parsedMsg);

          const msgObject = parsedMsg["data"];
          should.not.exist(msgObject);
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

      const parsedMsg = JSON.parse(msg);
      checkMsgOutline(parsedMsg);

      const msgObject = parsedMsg["data"];
      msgObject.should.have.properties("gameRoomUserList", "hostId");
      if (updateCount === 1) {
        msgObject.gameRoomUserList.should.have.lengthOf(2);
        msgObject.hostId.should.not
          .equal(ioOptions[0].myId)
          .with.equal(ioOptions[1].myId);
      } else {
        msgObject.gameRoomUserList.should.have.lengthOf(1);
        msgObject.hostId.should.not
          .equal(ioOptions[1].myId)
          .with.equal(ioOptions[2].myId);

        senders[2].emit(
          "gameRoomLeave",
          JSON.stringify({ id: ioOptions[2].myId, roomName }),
          (msg) => {
            msg.should.be.type("string");

            const parsedMsg = JSON.parse(msg);
            checkMsgOutline(parsedMsg);

            const msgObject = parsedMsg["data"];
            should.not.exist(msgObject);

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

        const parsedMsg = JSON.parse(msg);
        checkMsgOutline(parsedMsg);

        const msgObject = parsedMsg["data"];
        should.not.exist(msgObject);
        SingleObject.RoomRepository.findByRoomName(roomName).should.not.equal(
          false
        );
      }
    );
  });

  it("gameStart 테스트 - 방장이 아닌 사람이 스타트했을 때", (done) => {
    // 0이 1, 2를 초대하고
    // 1, 2가 방에 접속한 뒤
    // 1이 게임을 시작하면 실패
    senders[0].emit(
      "togetherInvite",
      JSON.stringify({
        id: ioOptions[0].myId,
        inviteTheseUsers: [senders[1].id, senders[2].id],
      }),
      (msg) => {
        msg.should.be.type("string");

        const parsedMsg = JSON.parse(msg);
        checkMsgOutline(parsedMsg);

        const msgObject = parsedMsg["data"];
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

            const parsedMsg = JSON.parse(msg);
            checkMsgOutline(parsedMsg);

            const msgObject = parsedMsg["data"];
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

                const parsedMsg = JSON.parse(msg);
                checkMsgOutline(parsedMsg);

                const msgObject = parsedMsg["data"];
                msgObject.should.have.properties("gameRoomUserList", "hostId");
                msgObject["gameRoomUserList"].should.have.lengthOf(3);

                // when
                senders[1].emit(
                  "gameStart",
                  JSON.stringify({
                    id: ioOptions[1].myId,
                    roomName,
                    radius: 0.01,
                    latitude: ioOptions[1].query.latitude,
                    longitude: ioOptions[1].query.longitude,
                  }),
                  (msg) => {
                    // then
                    msg.should.be.type("string");
                    const parsedMsg = JSON.parse(msg);

                    parsedMsg.should.have
                      .property("status")
                      .with.equal("false");

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
    // 방장인 0이 게임을 시작하고
    // 1, 2가 시작 메시지를 받기
    senders[1].on("gameStart", (msg) => {
      msg.should.be.type("string");

      const parsedMsg = JSON.parse(msg);
      checkMsgOutline(parsedMsg);

      const msgObject = parsedMsg["data"];
      msgObject.should.have.properties("status", "restaurants");
      msgObject.status.should.equal("ok");
      msgObject.restaurants.should.have.lengthOf(7);
      senders[1].off("gameStart");
    });
    senders[2].on("gameStart", (msg) => {
      msg.should.be.type("string");

      const parsedMsg = JSON.parse(msg);
      checkMsgOutline(parsedMsg);

      const msgObject = parsedMsg["data"];
      msgObject.should.have.properties("status", "restaurants");
      msgObject.status.should.equal("ok");
      msgObject.restaurants.should.have.lengthOf(7);

      // gameUserFinish 테스트를 위한 것.
      for (let r of msgObject.restaurants) {
        restaurantsId.push(r.id);
      }
      senders[2].off("gameStart");
      done();
    });
    senders[0].emit(
      "gameStart",
      JSON.stringify({
        id: ioOptions[0].myId,
        roomName,
        radius: 0.01,
        latitude: ioOptions[0].query.latitude,
        longitude: ioOptions[1].query.longitude,
      }),
      (msg) => {
        msg.should.be.type("string");

        const parsedMsg = JSON.parse(msg);
        checkMsgOutline(parsedMsg);

        const msgObject = parsedMsg["data"];
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
    // 1, 2 가 게임을 마친 결과를 각각 전송
    senders[1].emit(
      "gameUserFinish",
      JSON.stringify({
        id: ioOptions[1].myId,
        userGameResult: [
          {
            id: restaurantsId[0],
            sign: "y",
          },
          {
            id: restaurantsId[1],
            sign: "y",
          },
          {
            id: restaurantsId[2],
            sign: "y",
          },
          {
            id: restaurantsId[3],
            sign: "n",
          },
          {
            id: restaurantsId[4],
            sign: "n",
          },
          {
            id: restaurantsId[5],
            sign: "s",
          },
          {
            id: restaurantsId[6],
            sign: "s",
          },
        ],
        roomName,
      }),
      (msg) => {
        msg.should.be.type("string");
        const parsedMsg = JSON.parse(msg);
        checkMsgOutline(parsedMsg);

        const msgObject = parsedMsg["data"];
        msgObject.should.have.property("status").with.equal("wait");
      }
    );

    senders[2].emit(
      "gameUserFinish",
      JSON.stringify({
        id: ioOptions[2].myId,
        userGameResult: [
          {
            id: restaurantsId[0],
            sign: "y",
          },
          {
            id: restaurantsId[1],
            sign: "y",
          },
          {
            id: restaurantsId[2],
            sign: "y",
          },
          {
            id: restaurantsId[3],
            sign: "n",
          },
          {
            id: restaurantsId[4],
            sign: "n",
          },
          {
            id: restaurantsId[5],
            sign: "s",
          },
          {
            id: restaurantsId[6],
            sign: "s",
          },
        ],
        roomName,
      }),
      (msg) => {
        msg.should.be.type("string");

        const parsedMsg = JSON.parse(msg);
        checkMsgOutline(parsedMsg);

        const msgObject = parsedMsg["data"];
        msgObject.should.have.property("status").with.equal("wait");

        done();
      }
    );
  });

  it("gameAllFinish 테스트", (done) => {
    // 0이 마지막으로 게임 완료 메시지를 보내고
    // 0, 1, 2 가 gameAllFinish 결과 받기

    let doneCount = 0;
    for (let i = 0; i < 3; i++) {
      senders[i].on("gameAllFinish", (msg) => {
        doneCount += 1;
        msg.should.be.type("string");
        const parsedMsg = JSON.parse(msg);
        checkMsgOutline(parsedMsg);

        const msgObject = parsedMsg["data"];
        msgObject.should.have.property("roomGameResult");
        msgObject["roomGameResult"].should.have.properties(
          "result",
          "id",
          "headCount",
          "likeCount"
        );

        msgObject["roomGameResult"]["result"].should.equal("success");
        msgObject["roomGameResult"]["id"].should.equal(restaurantsId[0]);
        msgObject["roomGameResult"]["headCount"].should.equal(3);
        msgObject["roomGameResult"]["likeCount"].should.equal(3);

        if (doneCount === 3) {
          done();
        }
      });
    }

    senders[0].emit(
      "gameUserFinish",
      JSON.stringify({
        id: ioOptions[0].myId,
        userGameResult: [
          {
            id: restaurantsId[0],
            sign: "y",
          },
          {
            id: restaurantsId[1],
            sign: "y",
          },
          {
            id: restaurantsId[2],
            sign: "y",
          },
          {
            id: restaurantsId[3],
            sign: "n",
          },
          {
            id: restaurantsId[4],
            sign: "n",
          },
          {
            id: restaurantsId[5],
            sign: "s",
          },
          {
            id: restaurantsId[6],
            sign: "s",
          },
        ],
        roomName,
      }),
      (msg) => {
        msg.should.be.type("string");

        const parsedMsg = JSON.parse(msg);
        checkMsgOutline(parsedMsg);

        const msgObject = parsedMsg["data"];
        msgObject.should.have.property("status").with.equal("wait");
      }
    );
  });
  it("gameRoomJoinAgain 테스트", (done) => {
    // 1, 0 순으로 게임방에 재접속
    // 1은 gameRoomUpdate 확인
    // 1 이 게임시작
    // 2 가 재접속 시도 후 실패
    SingleObject.RoomRepository.findByRoomName(roomName).endGame();

    senders[1].on("gameRoomUpdate", (msg) => {
      msg.should.be.type("string");

      const parsedMsg = JSON.parse(msg);
      checkMsgOutline(parsedMsg);

      const msgObject = parsedMsg["data"];
      msgObject.should.have.property("gameRoomUserList").with.lengthOf(2);
    });
    senders[1].emit(
      "gameRoomJoinAgain",
      JSON.stringify({ id: ioOptions[1].myId, roomName }),
      (msg) => {
        msg.should.be.type("string");

        const parsedMsg = JSON.parse(msg);
        checkMsgOutline(parsedMsg);

        const msgObject = parsedMsg["data"];
        msgObject.should.have
          .property("gameRoomUserList")
          .with.have.lengthOf(1);
        msgObject.should.have.property("hostId").with.equal(ioOptions[1].myId);

        senders[0].emit(
          "gameRoomJoinAgain",
          JSON.stringify({ id: ioOptions[0].myId, roomName }),
          (msg) => {
            msg.should.be.type("string");

            const parsedMsg = JSON.parse(msg);
            checkMsgOutline(parsedMsg);

            const msgObject = parsedMsg["data"];
            msgObject.should.have
              .property("gameRoomUserList")
              .with.have.lengthOf(2);
            msgObject.should.have
              .property("hostId")
              .with.equal(ioOptions[1].myId);

            senders[1].emit(
              "gameStart",
              JSON.stringify({
                id: ioOptions[1].myId,
                roomName,
                radius: 0.01,
                latitude: ioOptions[1].query.latitude,
                longitude: ioOptions[1].query.longitude,
              }),
              (msg) => {
                msg.should.be.type("string");

                const parsedMsg = JSON.parse(msg);
                checkMsgOutline(parsedMsg);

                const msgObject = parsedMsg["data"];
                msgObject.should.have.property("status").with.equal("ok");
                msgObject.should.have.property("restaurants").with.lengthOf(7);

                senders[2].emit(
                  "gameRoomJoinAgain",
                  JSON.stringify({ id: ioOptions[2].myId, roomName }),
                  (msg) => {
                    msg.should.be.type("string");

                    const parsedMsg = JSON.parse(msg);
                    parsedMsg["success"].should.equal(false);
                    should.not.exist(parsedMsg["errorCode"]);

                    const msgObject = parsedMsg["data"];
                    should.not.exist(msgObject);

                    offEventAll("gameRoomUpdate", senders);
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
});
