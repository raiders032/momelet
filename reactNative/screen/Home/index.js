import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Alone from "../Alone";
import Together from "../Together";

const Stack = createStackNavigator();

function App({ userToken }) {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Alone"
          component={Alone}
          options={{
            headerShown: false,
          }}
          initialParams={{
            userToken: userToken,
          }}
        />
        <Stack.Screen
          name="Together"
          component={Together}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
