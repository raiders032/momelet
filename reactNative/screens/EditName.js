import React from "react";
import { StyleSheet, Text, View, TextInput, Button } from "react-native";

export default ({ navigation, route: { params } }) => {
  let name = params.placeholder;
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <TextInput
        placeholder={params.placeholder}
        autoFocus={true}
        style={{ fontSize: 17, width: "100%" }}
        textAlign="center"
        onSubmitEditing={({ nativeEvent: { text } }) => {
          name = text;
        }}
      />
      <Button
        title="수정"
        onPress={() => {
          navigation.navigate("MyPage", { name: name });
        }}
      />
    </View>
  );
};
