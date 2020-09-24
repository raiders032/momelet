// 37.5444086,127.0654405,17.9z
const latitude = 37.5447048;
const longitude = 127.0663154;
const refreshToken =
  "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIyMSIsInR5cGUiOiJyZWZyZXNoIiwiaWF0IjoxNjAwNDA4MTQ4LCJleHAiOjE2MDEyNzIxNDh9.fJdaVeJxVWcMmXBawcNi0DDtXHiAo-JcDuaIkZ_vg8n7MoSMnDhOcTYCfD3qcg69orNuLuDoNPJoK1TMKgz5Dw";
const jwtToken =
  "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIyMSIsInR5cGUiOiJhY2Nlc3MiLCJpYXQiOjE2MDA5MzAzMjAsImV4cCI6MTYwMDkzMzkyMH0.9OjoOwNf4REvply6H7MOtK0lR7VlSgCTuRR68HNpAo0ME7AZH2pDLiycjQYxFV11Jj3b_HgTkb4sNxe0yCcFAQ";
// "yJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIyMSIsInR5cGUiOiJhY2Nlc3MiLCJpYXQiOjE2MDA2NzQ5NTgsImV4cCI6MTYwMDY3ODU1OH0.rfpVhmv4yOKI0ewfP7P76nvgesYP02Wk1JV9Z7O9uX-gRUitsqK3_3MgJ9AX-F_1IRDfN08JaNJQLnSjSUTsoQ";

export default [
  {
    myId: 1,
    query: {
      id: 1,
      email: "jeong@naver.com",
      name: "Seonghoon",
      imageUrl: "naver.com",
      latitude: latitude,
      longitude: longitude,
      jwtToken,
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
      latitude: latitude - 0.0025,
      longitude: longitude,
      jwtToken,
    },
  },
  {
    myId: 21,
    query: {
      id: 21,
      email: "5@naver.com",
      name: "Ha",
      imageUrl: "naver.com",
      latitude: latitude - 0.001,
      longitude: longitude + 0.001,
      jwtToken,
    },
  },
  {
    myId: 6,
    query: {
      id: 6,
      email: "78@naver.com",
      name: "Kim",
      imageUrl: "naver.com",
      latitude: "37.5544086",
      longitude: "127.0754405",
      jwtToken,
    },
  },
  {
    myId: 7,
    query: {
      id: 7,
      email: "ky@naver.com",
      name: "Kimmy",
      imageUrl: "naver.com",
      latitude: "38.5544086",
      longitude: "128.0754405",
      jwtToken,
    },
  },
  {
    myId: 8,
    query: {
      id: 8,
      email: "78567@naver.com",
      name: "Kang",
      imageUrl: "naver.com",
      latitude: "38.5544086",
      longitude: "128.0754405",
      jwtToken,
    },
  },
  {
    myId: 9,
    query: {
      id: 9,
      email: "44353@naver.com",
      name: "Lee",
      imageUrl: "naver.com",
      latitude: "38.5544086",
      longitude: "128.0754405",
      jwtToken,
    },
  },
  {
    myId: 10,
    query: {
      id: 10,
      email: "101@naver.com",
      name: "Koo",
      imageUrl: "naver.com",
      latitude: "38.5544086",
      longitude: "128.0754405",
      jwtToken,
    },
  },
  {
    myId: 11,
    query: {
      id: 11,
      email: "1111@naver.com",
      name: "Park",
      imageUrl: "naver.com",
      latitude: "38.5544086",
      longitude: "128.0754405",
      jwtToken,
    },
  },
  {
    myId: 12,
    query: {
      id: 12,
      email: "18923987@naver.com",
      name: "Baek",
      imageUrl: "naver.com",
      latitude: "38.5544086",
      longitude: "128.0754405",
      jwtToken,
    },
  },
  {
    myId: 13,
    query: {
      id: 13,
      email: "posepr@naver.com",
      name: "Hosse",
      imageUrl: "naver.com",
      latitude: "38.5544086",
      longitude: "128.0754405",
      jwtToken,
    },
  },
  {
    myId: 14,
    query: {
      id: 14,
      email: "1t32twe@naver.com",
      name: "Ohh",
      imageUrl: "naver.com",
      latitude: "38.5544086",
      longitude: "128.0754405",
      jwtToken,
    },
  },
];
