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
import { TouchableOpacity } from "react-native-gesture-handler";
const { width: WIDTH, height: HEIGHT } = Dimensions.get("window");
export default ({ navigation, restaurants, style, user }) => {
  const [topIndex, setTopIndex] = useState(0);
  const [restaurantArray, setRestaurantArray] = useState(restaurants);
  const nextCard = () => setTopIndex((currentValue) => currentValue + 1);
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
    <View style={[styles.Container]}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("MyPage", { ...user });
        }}
      >
        <Text style={{ ...styles.category }}>내 정보</Text>
      </TouchableOpacity>
      <View style={[styles.CardContainer]}>
        {restaurantArray?.map((obj, index) => {
          if (index < topIndex) {
            return null;
          }

          if (index === topIndex) {
            return (
              <Animated.View
                key={index}
                style={{
                  ...styles.cardBasic,
                  zIndex: 1,
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
                  ...styles.cardBasic,
                  position: "absolute",
                  zIndex: -index,
                  opacity: secondCardOpacity,
                  transform: [{ scale: secondCardScale }],
                }}
                {...panResponder.panHandlers}
              >
                <Card key={index} restaurant={restaurants[index]} />
              </Animated.View>
            );
          }
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  Container: {
    backgroundColor: "cyan", //색깔 없애주기
    width: "100%",
    height: "100%",
  },
  CardContainer: {
    width: "100%",
    height: "100%",

    alignItems: "center",
  },
  cardBasic: {
    width: "90%",
    height: "90%",
    position: "absolute",
  },
  category: {
    alignSelf: "flex-end",
    marginTop: 50,
    marginRight: 15,
    fontSize: 15,
  },
});
