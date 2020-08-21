import React from "react";
import { View, Text, Dimensions } from "react-native";
import Menu from "./Menu";
import ExtraIcon from "./ExtraIcon";
import fontNormalize from "../utils/fontNormalize";
console.log(fontNormalize(20));
const { width: WIDTH, height: HEIGHT } = Dimensions.get("window");
export default () => {
  return (
    <View>
      <View
        style={{
          height: "70%",
          alignItems: "center",
          padding: 15,
          // backgroundColor: "blue",
        }}
      >
        <Text style={{ fontSize: HEIGHT / 30, marginBottom: 25 }}>메뉴판</Text>

        <Menu menu={"삼겹살"} price={"25,000"} />
        <Menu menu={"삼겹살"} price={"25,000"} />
        <Menu menu={"삼겹살"} price={"25,000"} />
        <Menu menu={"삼겹살"} price={"25,000"} />
        <Menu menu={"삼겹살"} price={"25,000"} style={{ marginBottom: 0 }} />
      </View>
      <View
        style={{
          height: "30%",
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
          // backgroundColor: "yellow",
        }}
      >
        <ExtraIcon
          uri="https://lh3.googleusercontent.com/proxy/a1FCtxNzoltFnQGJQI6Bsizadc9gifUUzP7yU2ISE16BVxpRsX5o4NmBZ3lM1yfXA5R1C_q-HgVtslRCylSOj6QVGFEZlGcyvDfyBBGk2BLRUISVkwdP71B-edn-0DMwf8AExeO0pW0kHWxAoJpSjOuG5xd58sO4-fnGuc-T7ptlGoWwJMfJv6g6vz1Cquyw9jT1lgp9flBw3r54yOAl0LZ4JD9R1iHAKKXB_0cLdXz1aYsP9oC6pDGJJX1nSri_i9ISjCvtaRqRZFz_0w70ZaWvPphf5aNJZkDrxUDuoRDKfmfzApQitU2PI2EM9hrmYF20uGNgAQw6H1sRQpIXPDC0qfkNhEIwybsM3iig_hKX6LY"
          text="전화하기"
        />
        <ExtraIcon
          uri="https://i.pinimg.com/474x/a3/a6/a0/a3a6a020c91a24f4d44fc154d9f68db9.jpg"
          text="길찾기"
        />
        <ExtraIcon
          uri="data:image/png;base64,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"
          text="주소복사"
        />
      </View>
    </View>
  );
};
