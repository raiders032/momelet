import React, { useRef, useEffect } from "react";
import {
  View,
  Image,
  Text,
  Dimensions,
  Animated,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import Card from "./Card";
import SeeMenuButton from "./SeeMenuButton";
import RestaurantBasicInfo from "./RestaurantBasicInfo";
import PresentMenu from "./PresentMenu";
import CardBack from "./CardBack";

export default ({ restaurant, header, cover }) => {
  let changeValue = 0;
  const lotation = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    lotation.setValue(0);
  }, [restaurant]);
  lotation.addListener(({ value }) => {
    changeValue = value;
  });
  const frontInterpolate = lotation.interpolate({
    inputRange: [0, 180],
    outputRange: ["0deg", "180deg"],
  });
  const backInterpolate = lotation.interpolate({
    inputRange: [0, 180],
    outputRange: ["180deg", "360deg"],
  });

  // const isFlipping = useRef(false);
  let isFlipping = false;
  const [test, setTest] = React.useState({});

  const flipCard = () => {
    setTest({});
    if (isFlipping) {
      return;
    }

    isFlipping = true;

    if (changeValue >= 90) {
      Animated.timing(lotation, {
        toValue: 0,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(lotation, {
        toValue: 180,

        useNativeDriver: true,
      }).start();
    }
    setTimeout(() => {
      isFlipping = false;
    }, 1000);
  };

  const CardImage = React.useCallback(() => {
    return (
      <Image
        source={{ uri: restaurant.thumUrl }}
        style={{
          height: "100%",
          borderTopRightRadius: 20,
          borderTopLeftRadius: 20,
        }}
      />
    );
  }, [restaurant.thumUrl]);

  return (
    <Card>
      <View style={{ width: "100%", height: "100%" }}>
        <View style={{ height: "65%" }}>
          <Animated.View
            style={{
              width: "100%",
              height: "100%",

              transform: [{ rotateY: backInterpolate }],
              backfaceVisibility: "hidden",
              position: "absolute",
            }}
          >
            <CardBack menus={restaurant.menu} name={restaurant.name} />
          </Animated.View>
          <Animated.View
            style={{
              transform: [{ rotateY: frontInterpolate }],
              backfaceVisibility: "hidden",
            }}
          >
            {header}

            <CardImage />
            {cover}
          </Animated.View>
        </View>
        <View style={{ height: "35%", paddingHorizontal: 15 }}>
          <View
            style={{
              height: "45%",
            }}
          >
            <View
              style={{
                height: "100%",
                borderColor: "#e4e4e4",
                borderBottomWidth: 0.7,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <RestaurantBasicInfo
                title={restaurant.name}
                distance={"500M"}
                point={"4.4점"}
              />
              <TouchableOpacity
                style={{ width: "20%", height: "40%" }}
                onPress={flipCard}
              >
                <SeeMenuButton />
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{
              height: "55%",
              justifyContent: "center",
            }}
          >
            <Text
              style={{ fontFamily: "Godo", fontSize: 18, marginBottom: 10 }}
            >
              대표메뉴
            </Text>
            {restaurant.menu[0] && (
              <PresentMenu
                menu={restaurant.menu[0].name}
                price={restaurant.menu[0].price}
              />
            )}
            {restaurant.menu[1] && (
              <PresentMenu
                menu={restaurant.menu[1].name}
                price={restaurant.menu[1].price}
              />
            )}
          </View>
        </View>
      </View>
    </Card>
  );
};
