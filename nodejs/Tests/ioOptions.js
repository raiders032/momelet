// 37.5444086,127.0654405,17.9z
const latitude = 37.5447048;
const longitude = 127.0663154;
const refreshToken =
  "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiI4IiwiaWF0IjoxNjAwMDczNjQ2LCJleHAiOjE2MDA5Mzc2NDZ9.1VekyY_jSjxsawoiDmtQJhGnoLR6-mNx8ZG4k61QAMhVZ07mKKAc8vDknE6j3iSN3cTJmBzDUomxfUN13cLIiQ";
const jwtToken =
  // "yJhbGciOiJIUzUxMiJ9.eyJzdWIiOiI3IiwiaWF0IjoxNTk5NTU2NTczLCJleHAiOjE2MDA0MjA1NzN9.ZP2ughltXma1wIPdv8qtBWO_W_3W__-gKheZhpGdGyOwJ3KwTRvThRyRuz7BSQtiGmjXEP9ZgfOiw1dIdJwEyA";
  "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiI4IiwiaWF0IjoxNjAwMDczNjQ2LCJleHAiOjE2MDAwNzcyNDZ9.y8ZrGm8sbFu-QZbhzAfGke0nfJsyG_kxQVTaf-5bMUXM0y4tiT9-hK103O3BHSUBD1ewk18veZ_iL5_0BvyPGw";

export default [
  {
    myId: 1,
    query: {
      id: 1,
      email: "jeong@naver.com",
      name: "Seonghoon",
      imageUrl: "naver.com",
      JWT: jwtToken,
      latitude: "37.5444086",
      latitude: latitude,
      longitude: "127.0654405",
      longitude: longitude,
    },
    extraHeaders: { Authorization: `Bearer ${jwtToken}` },
  },
  {
    myId: 4,
    query: {
      id: 4,
      email: "4@naver.com",
      name: "Noh",
      imageUrl: "naver.com",
      JWT: jwtToken,
      latitude: latitude - 0.0025,
      longitude: longitude,
    },
  },
  {
    myId: 5,
    query: {
      id: 5,
      email: "5@naver.com",
      name: "Ha",
      imageUrl: "naver.com",
      JWT: jwtToken,
      latitude: latitude - 0.001,
      longitude: longitude + 0.001,
    },
  },
  {
    myId: 6,
    query: {
      id: 6,
      email: "78@naver.com",
      name: "Kim",
      imageUrl: "naver.com",
      JWT: jwtToken,
      latitude: "37.5544086",
      longitude: "127.0754405",
    },
  },
  {
    myId: 7,
    query: {
      id: 7,
      email: "ky@naver.com",
      name: "Kimmy",
      imageUrl: "naver.com",
      JWT: jwtToken,
      latitude: "38.5544086",
      longitude: "128.0754405",
    },
  },
  {
    myId: 8,
    query: {
      id: 8,
      email: "78567@naver.com",
      name: "Kang",
      imageUrl: "naver.com",
      JWT: jwtToken,
      latitude: "38.5544086",
      longitude: "128.0754405",
    },
  },
  {
    myId: 9,
    query: {
      id: 9,
      email: "44353@naver.com",
      name: "Lee",
      imageUrl: "naver.com",
      JWT: jwtToken,
      latitude: "38.5544086",
      longitude: "128.0754405",
    },
  },
  {
    myId: 10,
    query: {
      id: 10,
      email: "101@naver.com",
      name: "Koo",
      imageUrl: "naver.com",
      JWT: jwtToken,
      latitude: "38.5544086",
      longitude: "128.0754405",
    },
  },
  {
    myId: 11,
    query: {
      id: 11,
      email: "1111@naver.com",
      name: "Park",
      imageUrl: "naver.com",
      JWT: jwtToken,
      latitude: "38.5544086",
      longitude: "128.0754405",
    },
  },
  {
    myId: 12,
    query: {
      id: 12,
      email: "18923987@naver.com",
      name: "Baek",
      imageUrl: "naver.com",
      JWT: jwtToken,
      latitude: "38.5544086",
      longitude: "128.0754405",
    },
  },
  {
    myId: 13,
    query: {
      id: 13,
      email: "posepr@naver.com",
      name: "Hosse",
      imageUrl: "naver.com",
      JWT: jwtToken,
      latitude: "38.5544086",
      longitude: "128.0754405",
    },
  },
  {
    myId: 14,
    query: {
      id: 14,
      email: "1t32twe@naver.com",
      name: "Ohh",
      imageUrl: "naver.com",
      JWT: jwtToken,
      latitude: "38.5544086",
      longitude: "128.0754405",
    },
  },
];
