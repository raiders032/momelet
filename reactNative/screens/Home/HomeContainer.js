import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import HomePresenter from "./HomePresenter";
import { apis } from "../../api";
import AsyncStorage from "@react-native-community/async-storage";
import * as Location from "expo-location";
import Test from "../Test";
const { width: WIDTH, height: HEIGHT } = Dimensions.get("window");
console.log(WIDTH, HEIGHT);
export default () => {
  const [restaurant, setRestaurant] = useState({
    loading: true,
    restaurant: [],
  });

  const getUserRestaurant = async () => {
    try {
      const userId = await AsyncStorage.getItem("@userId");
      const location = await Location.getCurrentPositionAsync({});
      const response = await apis.getRestaurant(
        // location.coords.latitude,
        // location.coords.longitude
        37.553292,
        126.9125836
      );
      setRestaurant({ loading: false, restaurant: response.data });

      // setTimeout(async () => {
      //   await setRestaurant({ loading: false, restaurant: [] });
      //   console.log(restaurant);
      // }, 5000);
    } catch (e) {
      console.error("error In HomeContainer", e);
    }
  };

  useEffect(() => {
    getUserRestaurant();
  }, []);

  return restaurant.loading ? (
    <Test style={[styles.container]} />
  ) : (
    <HomePresenter style={[styles.container]} />
  );
};

const styles = StyleSheet.create({
  container: {
    width: WIDTH / 1.2,
    height: HEIGHT / 1.2,

    borderRadius: 50,
  },
});
