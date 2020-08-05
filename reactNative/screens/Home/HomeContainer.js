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

  const [user, setUser] = useState(() => {
    const getUser = async () => {
      try {
        const result = await apis.getUserMe(userToken);
        setUser(result.data);
        console.log("get User : ", result.data);
        return { ...result.data };
      } catch (error) {
        console.log("error in get user", error);
      }
    };
    getUser();
  });

  const [restaurants, setRestaurants] = useState({
    loading: true,
    restaurants: [],
  });

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
        console.log("get Restaurant");
        setRestaurants({ loading: false, restaurants: response.data });
      } else {
        throw new Error("Location permission not granted");
      }
    } catch (e) {
      console.log("error In HomeContainer", e);
    }
  };

  useEffect(() => {
    getUserRestaurant();
  }, [user]);
  return restaurants.loading ? (
    <Test style={[styles.container]} />
  ) : (
    <HomePresenter
      navigation={navigation}
      restaurants={restaurants.restaurants}
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
