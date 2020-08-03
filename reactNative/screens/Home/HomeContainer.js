import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import { apis } from "../../api";
import AsyncStorage from "@react-native-community/async-storage";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import Test from "../Test";
import HomePresenter from "./HomePresenter";
import Test2 from "../Test2";
const { width: WIDTH, height: HEIGHT } = Dimensions.get("window");

export default ({ navigation, route }) => {
  const userToken = route.params.userToken;
  const [user, setUser] = useState(() => {});

  const [restaurantLoading, setRestaurantLoading] = useState({
    loading: true,
    restaurant: [],
  });

  const getUser = async () => {
    const result = await apis.getUserMe(userToken);

    setUser(result.data);
    return { ...result.data };
  };

  const getUserRestaurant = async () => {
    try {
      const { status, permissions } = await Permissions.askAsync(
        Permissions.LOCATION
      );
      if (status === "granted") {
        const location = await Location.getCurrentPositionAsync({});
        const response = await apis.getRestaurant(
          // location.coords.latitude,
          // location.coords.longitude
          37.553292,
          126.9125836
        );

        setRestaurantLoading({ loading: false, restaurant: response.data });
      } else {
        throw new Error("Location permission not granted");
      }
    } catch (e) {
      console.log("error In HomeContainer", e);
    }
  };

  useEffect(() => {
    getUserRestaurant();
    getUser();
  }, []);
  return restaurantLoading.loading ? (
    <Test style={[styles.container]} />
  ) : (
    <HomePresenter
      navigation={navigation}
      restaurants={restaurantLoading.restaurant}
      style={[styles.container]}
      user={user}
      setUser={setUser}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    width: WIDTH,
    height: HEIGHT,
  },
});
