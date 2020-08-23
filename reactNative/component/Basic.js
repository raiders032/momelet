import React, { Children } from "react";
import { View, Text } from "react-native";
import { AppLoading } from "expo";

import CoverMessage from "./CoverMessage";
export default ({
  coverMessageConfig = {
    zIndex: -1,
    bodyMessage: <Text></Text>,
    footerMessage: ["예", "아니요"],
    coverMessageRightEvent: () => {},
    coverMessageLeftEvent: () => {},
  },
  children,
  footer,
}) => {
  // console.log(coverMessageConfig);
  return (
    <View style={{ flex: 1 }}>
      <View style={{ height: "90%", backgroundColor: "#FEEE7D" }}>
        {children}
      </View>
      <View style={{ height: "10%", backgroundColor: "white" }}>{footer}</View>
      <CoverMessage
        zIndex={coverMessageConfig.zIndex}
        bodyMessage={coverMessageConfig.bodyMessage}
        footerMessage={coverMessageConfig.footerMessage}
        coverMessageRightEvent={coverMessageConfig.coverMessageRightEvent}
        coverMessageLeftEvent={coverMessageConfig.coverMessageLeftEvent}
      />
    </View>
  );
};
