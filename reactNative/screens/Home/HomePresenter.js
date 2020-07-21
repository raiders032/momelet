import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import Card from "../../components/Card";
export default ({ restaurants, style }) => {
  let tenRestaurants = [];
  for (let i = 0; i < 10; i++) {
    tenRestaurants.push(<Card key={i} restaurant={restaurants[i]} />);
  }

  return <View style={[style, styles.cardContainer]}>{tenRestaurants[0]}</View>;
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: "cyan", //색깔 없애주기
  },
});
