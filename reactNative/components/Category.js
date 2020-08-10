import React from "react";
import { StyleSheet, Text, TouchableHighlight, Button } from "react-native";

const Category = ({ title, categories, setCategory }) => {
  const categoryPress = (name) => {
    categories[name] = categories[name] ? 0 : 1;
    console.log("after", categories);
    setCategory({
      ...categories,
    });
  };
  return (
    <Button
      color={categories[title] === 1 ? "blue" : "red"}
      title={title}
      onPress={() => categoryPress(title)}
    />
  );
};

export default Category;
