import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import HomePresenter from "./HomePresenter";
import { apis } from "../../api";
import AsyncStorage from "@react-native-community/async-storage";
import * as Location from "expo-location";
import Test from "../Test";

const { width: WIDTH, height: HEIGHT } = Dimensions.get("window");

export default ({ userToken }) => {
  const [user, setUser] = useState(() => {
    const getUser = async () => {
      const result = await apis.getUserMe(userToken);
      return result.data;
    };
    getUser();
  });
  const [restaurantLoading, setRestaurantLoading] = useState({
    loading: true,
    restaurant: [],
  });

  const getUserRestaurant = async () => {
    try {
      const location = await Location.getCurrentPositionAsync({});
      const response = await apis.getRestaurant(
        // location.coords.latitude,
        // location.coords.longitude
        37.553292,
        126.9125836
      );
      setRestaurantLoading({ restaurant: response.data });
    } catch (e) {
      console.error("error In HomeContainer", e);
    }
  };

  useEffect(() => {
    getUserRestaurant();
    setRestaurantLoading((before) => ({
      loading: true,
      restaurant: before.restaurant,
    }));
  }, []);

  return restaurantLoading.loading ? (
    <Test style={[styles.container]} />
  ) : (
    <HomePresenter
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
