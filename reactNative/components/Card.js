import React from "react";
import {
  TouchableOpacity,
  Animated,
  StyleSheet,
  View,
  Text,
  Image,
  Easing,
} from "react-native";

export default ({ restaurant }) => {
  const animatedValueTop = new Animated.Value(0);
  const animatedValueWhole = new Animated.Value(0);
  let changeValueTop;
  animatedValueTop.addListener(({ value }) => {
    changeValueTop = value;
  });
  animatedValueWhole.addListener(({ value }) => {
    changeValueTop = value;
  });
  const frontInterpolate = animatedValueTop.interpolate({
    inputRange: [0, 180],
    outputRange: ["0deg", "180deg"],
  });
  const backInterpolate = animatedValueTop.interpolate({
    inputRange: [0, 180],
    outputRange: ["180deg", "360deg"],
  });
  const flipCard = (which) => {
    let target;
    if (which === "Top") {
      target = animatedValueTop;
    } else {
      target = animatedValueWhole;
    }
    if (changeValueTop >= 130) {
      Animated.timing(target, {
        toValue: 0,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(target, {
        toValue: 180,

        useNativeDriver: true,
      }).start();
    }
  };
  return (
    <>
      <View
        style={{
          flex: 1,
          height: "100%",
          width: "100%",
          paddingVertical: 50,
          paddingHorizontal: 20,
        }}
      >
        <View
          style={[
            {
              flex: 1,
              height: "100%",
              width: "100%",

              alignItems: "center",
            },
          ]}
        >
          <Animated.View
            style={{
              width: "100%",
              height: "100%",
              backfaceVisibility: "hidden",
              transform: [{ rotateY: frontInterpolate }],
            }}
          >
            <Image
              style={{
                width: "100%",
                height: "100%",
                borderTopLeftRadius: 50,
                borderTopRightRadius: 50,
              }}
              source={{ uri: restaurant.thumUrl }}
            />
          </Animated.View>
          <Animated.View
            style={[
              {
                width: "100%",
                height: "100%",
                backfaceVisibility: "hidden",
                position: "absolute",
              },
              { transform: [{ rotateY: backInterpolate }] },
            ]}
          >
            <Image
              style={{
                width: "100%",
                height: "100%",
                borderTopLeftRadius: 50,
                borderTopRightRadius: 50,
              }}
              source={require("../assets/food2.jpg")}
            />
          </Animated.View>
          <TouchableOpacity
            style={{ position: "absolute", zIndex: 10, alignSelf: "flex-end" }}
            onPress={() => flipCard("Top")}
          >
            <Text
              style={{
                fontSize: 25,
                color: "white",
                marginTop: 10,
                marginRight: 15,
              }}
            >
              Detail
            </Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            flex: 1,
            backgroundColor: "red",
            borderBottomLeftRadius: 50,
            borderBottomRightRadius: 50,
          }}
        >
          <Text>{restaurant.name}</Text>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  Card: {
    height: "100%",
    width: "100%",
  },
  flipCard: {
    width: "100%",
    height: "100%",

    backgroundColor: "blue",
    backfaceVisibility: "hidden",
  },
  flipCardBack: {
    backgroundColor: "red",
    position: "absolute",
  },
  flipText: {
    width: 90,
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
  },
});
