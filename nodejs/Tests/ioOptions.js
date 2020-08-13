// 37.5444086,127.0654405,17.9z
const ioOptions = [
  {
    myId: "1",
    query: {
      id: "1",
      email: "jeong@naver.com",
      name: "Seonghoon",
      imageUrl: "naver.com",
      JWT:
        "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxIiwiaWF0IjoxNTk3MzA1NzgzLCJleHAiOjE1OTgxNjk3ODN9.7beQjaodFkouUfTNoCDj9KKJ1qKnwmcBabvT1nDDFrtO3oLfxFbMct475bcgw9Ewzka1vaeT3m8S8zvtE4yNpg",
      latitude: "37.5444086",
      longitude: "127.0654405",
    },
  },
  {
    myId: "4",
    query: {
      id: "4",
      email: "4@naver.com",
      name: "Noh",
      imageUrl: "naver.com",
      JWT: "sdgsdf@#$",
      latitude: "37.5419086",
      longitude: "127.0655405",
    },
  },
  {
    myId: "5",
    query: {
      id: "5",
      email: "5@naver.com",
      name: "Ha",
      imageUrl: "naver.com",
      JWT: "kkkkmkdf",
      latitude: "37.5443086",
      longitude: "127.0653405",
    },
  },
  {
    myId: "6",
    query: {
      id: "6",
      email: "78@naver.com",
      name: "Kim",
      imageUrl: "naver.com",
      JWT: "adffgf",
      latitude: "37.5544086",
      longitude: "127.0754405",
    },
  },
];

module.exports = ioOptions;

//http://ec2-3-34-162-241.ap-northeast-2.compute.amazonaws.com:8080/api/v1/restaurants7?id=1,&longitude=37.5444086&latitude=127.0654405&radius=0.01
//http://ec2-3-34-162-241.ap-northeast-2.compute.amazonaws.com:8080/api/v1/restaurants7?id=1,4&latitude=37.553292&longitude=126.9125836&radius=0.01

//http://ec2-3-34-162-241.ap-northeast-2.compute.amazonaws.com:8080/api/v1/restaurants7?id=1,4&latitude=37.553292&longitude=126.9125836&radius=0.01&Authorization=Barer%20eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxIiwiaWF0IjoxNTk2NDMzNTYzLCJleHAiOjE1OTcyOTc1NjN9.uqOTc8S6dJiEJT1_nQQQ-sg8vFw6NWGMBkqbKI7Egt-exQ-NYWrwSfIPEHzkI_fI5t4oHXiyTDViIVx7cJgQUQ
