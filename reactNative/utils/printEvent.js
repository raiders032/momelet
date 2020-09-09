const printSocketEvent = (eventName, msg) => {
  console.log("서버로부터 온 메세지");
  console.log(`이벤트 명 : ${eventName}`, msg);
};
export default printSocketEvent;
