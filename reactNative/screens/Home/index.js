import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeContainer from "./HomeContainer";
import MyPage from "../MyPage";
import EditName from "../EditName";
const Stack = createStackNavigator();

export default ({ userToken }) => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen
          name="HomeContainer"
          component={HomeContainer}
          initialParams={{ userToken: userToken }}
        />
        <Stack.Screen name="MyPage" component={MyPage} />
        <Stack.Screen name="EditName" component={EditName} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
