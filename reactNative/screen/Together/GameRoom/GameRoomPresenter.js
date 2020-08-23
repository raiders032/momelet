import React, { useRef, useState, useEffect } from "react";
import {
  View,
  Animated,
  PanResponder,
  Dimensions,
  Image,
  Text,
  TouchableOpacity,
} from "react-native";
import Basic from "../../../component/Basic";
import RestaurantCard from "../../../component/RestaurantCard";
import RestaurantHeader from "../../../component/RestaurantHeader";
const { width: WIDTH, height: HEIGHT } = Dimensions.get("window");
export default ({ restaurants, zIndex, infoText, gameFinish }) => {
  console.log("GameRoomPresenter render");
  const timeFinish = useRef(false);
  const [restaurant, setRestaurant] = useState(restaurants);
  const [firstRestaurant, secondRestaurant, ...otherRestaurant] = restaurant;
  const gameResult = useRef([]);

  const remainTime = useRef(new Animated.Value(0)).current;

  const position = new Animated.ValueXY();
  const rotationValues = position.x.interpolate({
    inputRange: [-200, 0, 200],
    outputRange: ["-13deg", "0deg", "13deg"],
    extrapolate: "clamp",
  });
  const topPositionConfig = position.x.interpolate({
    inputRange: [-200, 0, 200],
    outputRange: [0, 10, 0],
    extrapolate: "clamp",
  });
  const scaleXPositionConfig = position.x.interpolate({
    inputRange: [-200, 0, 200],
    outputRange: [1, 0.95, 1],
    extrapolate: "clamp",
  });
  const TimerWidthConfig = remainTime.interpolate({
    inputRange: [0, 15],
    outputRange: ["80%", "0%"],
    extrapolate: "clamp",
  });
  const dislikeOpacityConfig = position.x.interpolate({
    inputRange: [0, 200],
    outputRange: [0, 1],
  });
  const likeOpacityConfig = position.x.interpolate({
    inputRange: [-200, -0],
    outputRange: [1, 0],
  });
  const cardGoDown = () => {
    console.log("cardGoDownAnimation");
    Animated.timing(position, {
      toValue: {
        x: 0,
        y: HEIGHT + 50,
      },
      duration: 500,
      useNativeDriver: false,
    }).start(() => {
      afterCardMove("soso");
    });
  };
  const afterCardMove = (response) => {
    console.log("response: ", response);

    console.log("gameResult.current.length", gameResult.current.length);
    if (gameResult.current.length >= 6) {
      gameResult.current.push({ id: firstRestaurant.id, sign: response });
      gameFinish(gameResult);
    } else {
      gameResult.current.push({ id: firstRestaurant.id, sign: response });
      setRestaurant([secondRestaurant, ...otherRestaurant]);
    }
  };
  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: (evt, gestureState) => true,
    onPanResponderMove: (evt, { dx, dy }) => {
      position.setValue({ x: dx, y: dy });
    },
    onPanResponderRelease: (evt, { dx, dy }) => {
      if (dx >= 150) {
        Animated.timing(position, {
          toValue: {
            x: WIDTH + 50,
            y: dy,
          },
          duration: 200,
          useNativeDriver: false,
        }).start(() => {
          afterCardMove("n");
        });
      } else if (dx <= -150) {
        Animated.timing(position, {
          toValue: {
            x: -WIDTH - 50,
            y: dy,
          },
          duration: 100,
          useNativeDriver: false,
        }).start(() => {
          afterCardMove("y");
        });
      } else {
        Animated.spring(position, {
          toValue: {
            x: 0,
            y: 0,
          },
          useNativeDriver: false,
        }).start();
      }
    },
  });

  const cardGoRight = () => {
    timeFinish.current = false;
    console.log("Here", timeFinish.current);
    Animated.timing(position, {
      toValue: {
        x: WIDTH + 50,
        y: 0,
      },
      duration: 500,
      useNativeDriver: false,
    }).start(() => {
      afterCardMove("n");
    });
  };
  const cardGoLeft = () => {
    Animated.timing(position, {
      toValue: {
        x: -WIDTH - 50,
        y: 0,
      },
      duration: 500,
      useNativeDriver: false,
    }).start(() => {
      afterCardMove("y");
    });
  };
  const timeGo = () => {
    Animated.timing(remainTime, {
      toValue: 15,
      duration: 2000,
      useNativeDriver: false,
      //carGoDown
    }).start(() => {
      // cardGoDown();
      afterCardMove("soso");
    });
  };

  useEffect(() => {
    timeFinish.current = true;
    position.setValue({ x: 0, y: 0 });
    remainTime.setValue(0);
    const timeout = setTimeout(timeGo, 1000);
    return () => {
      clearTimeout(timeout);
    };
  }, [restaurant]);
  const header = (
    <RestaurantHeader
      dislikeOpacity={dislikeOpacityConfig}
      likeOpacity={likeOpacityConfig}
    />
  );
  const footer = (
    <View
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: "#FEEE7D",
        // backgroundColor: "black",
      }}
    >
      <View
        style={{
          width: "100%",
          height: "100%",
          flexDirection: "row",
          justifyContent: "center",
          bottom: 10,
        }}
      >
        <TouchableOpacity onPress={cardGoRight}>
          <Image
            style={{ height: 70, width: 70, resizeMode: "contain" }}
            source={require("../../../assets/dislike.png")}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={cardGoDown}>
          <Image
            style={{ height: 70, width: 70, resizeMode: "contain" }}
            source={require("../../../assets/soso.png")}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={cardGoLeft}>
          <Image
            style={{ height: 70, width: 70, resizeMode: "contain" }}
            source={require("../../../assets/like.png")}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
  return (
    <View style={{ width: "100%", height: "100%" }}>
      <Basic footer={footer}>
        <Animated.View
          style={{
            height: 10,
            backgroundColor: "#a0cf22",
            top: HEIGHT / 25,
            width: TimerWidthConfig,
            left: WIDTH / 12,
            borderRadius: 15,
          }}
        ></Animated.View>
        <View
          style={{
            flex: 1,
          }}
        >
          <Animated.View
            style={{
              top: topPositionConfig,
              width: "100%",
              height: "100%",
              justifyContent: "center",
              alignItems: "center",
              position: "absolute",
              transform: [{ scaleX: scaleXPositionConfig }],
            }}
            {...panResponder.panHandlers}
          >
            {secondRestaurant ? (
              <RestaurantCard restaurant={secondRestaurant} />
            ) : (
              <View />
            )}
          </Animated.View>
          <Animated.View
            style={{
              width: "100%",
              height: "100%",
              justifyContent: "center",
              alignItems: "center",
              position: "absolute",
              transform: [
                { rotate: rotationValues },
                ...position.getTranslateTransform(),
              ],
            }}
            {...panResponder.panHandlers}
          >
            {firstRestaurant ? (
              <RestaurantCard restaurant={firstRestaurant} header={header} />
            ) : (
              <View />
            )}
          </Animated.View>
        </View>
      </Basic>
      <View
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
          zIndex: zIndex,
          backgroundColor: "#000000",
          opacity: 0.7,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontFamily: "Godo",
            fontSize: 24,
            color: "white",
          }}
        >
          {infoText}
        </Text>
      </View>
    </View>
  );
};
