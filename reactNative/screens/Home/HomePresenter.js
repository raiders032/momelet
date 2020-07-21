import React, { useState } from "react";
import {
  StyleSheet,
  Animated,
  Text,
  View,
  Button,
  PanResponder,
  Dimensions,
} from "react-native";
import Card from "../../components/Card";
const { width: WIDTH, height: HEIGHT } = Dimensions.get("window");
export default ({ restaurants, style }) => {
  // restaurants.map((res) => {
  //   console.log(res.name);
  // });
  // let tenRestaurants = [];
  // for (let i = 0; i < 10; i++) {
  //   tenRestaurants.push(<Card key={i} restaurant={restaurants[i]} />);
  // }
  const [topIndex, setTopIndex] = useState(0);
  const [restaurantArray, setRestaurantArray] = useState(restaurants);
  const nextCard = () => setTopIndex((currentValue) => currentValue + 1);
  // const nextCard = () => {
  //   setRestaurantArray((currentValue) => {
  //     const abc = currentValue.slice(0, -1);
  //     console.log("Abc", restaurantArray.length);
  //     return [...abc];
  //   });
  // };
  const position = new Animated.ValueXY();
  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: (evt, gestureState) => true,
    onPanResponderMove: (evt, { dx, dy }) => {
      position.setValue({ x: dx, y: dy });
    },
    onPanResponderRelease: (evt, { dx, dy }) => {
      if (dx >= 200) {
        Animated.spring(position, {
          toValue: {
            x: WIDTH + 100,
            y: dy,
          },
          useNativeDriver: true,
        }).start(nextCard);
      } else if (dx <= -200) {
        Animated.spring(position, {
          toValue: {
            x: -WIDTH - 100,
            y: dy,
          },
          useNativeDriver: true,
        }).start(nextCard);
      } else {
        Animated.spring(position, {
          toValue: {
            x: 0,
            y: 0,
          },
          useNativeDriver: true,
        }).start();
      }
    },
  });
  const rotationValues = position.x.interpolate({
    inputRange: [-200, 0, 200],
    outputRange: ["-13deg", "0deg", "13deg"],
    extrapolate: "clamp",
  });
  const secondCardOpacity = position.x.interpolate({
    inputRange: [-200, 0, 200],
    outputRange: [1, 0.1, 1],
    extrapolate: "clamp",
  });
  const secondCardScale = position.x.interpolate({
    inputRange: [-200, 0, 200],
    outputRange: [1, 0.3, 1],
    extrapolate: "clamp",
  });
  return (
    <View style={[{ width: "100%", height: "100%" }, styles.cardContainer]}>
      {restaurantArray.map((obj, index) => {
        if (index < topIndex) {
          return null;
        }

        if (index === topIndex) {
          return (
            <Animated.View
              key={index}
              style={{
                position: "absolute",
                zIndex: 1,
                width: "100%",
                height: "100%",
                transform: [
                  { rotate: rotationValues },
                  ...position.getTranslateTransform(),
                ],
              }}
              {...panResponder.panHandlers}
            >
              <Card key={index} restaurant={restaurants[index]} />
            </Animated.View>
          );
        } else if (index === topIndex + 1) {
          return (
            <Animated.View
              key={index}
              style={{
                position: "absolute",
                zIndex: -index,
                width: "100%",
                height: "100%",
                opacity: secondCardOpacity,
                transform: [{ scale: secondCardScale }],
              }}
              {...panResponder.panHandlers}
            >
              <Card key={index} restaurant={restaurants[index]} />
            </Animated.View>
          );
        } else {
          // <Animated.View
          //   key={index}
          //   style={{
          //     position: "absolute",
          //     zIndex: -index,
          //     width: "100%",
          //     height: "100%",
          //     opacity: 0,
          //   }}
          //   {...panResponder.panHandlers}
          // >
          //   <Card key={index} restaurant={restaurants[index]} />
          // </Animated.View>;
        }
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: "cyan", //색깔 없애주기
  },
});
