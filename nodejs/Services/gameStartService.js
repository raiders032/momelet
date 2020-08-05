const gameStartService = (socket, msg) => {
  var echo = "gameStart 이벤트. 받은 msg: " + msg;
  console.log(echo);
  var temp = 0;
  for (i = 0; i < 100000000; i++) {
    temp += 1;
    // var k = 0;
    // for (j = 0; j < 10; j++) {
    //   k += 1;
    // }
  }
  console.log("temp 계산 끝! : " + temp);
  return temp;
};

module.exports = {
  gameStartService,
};
