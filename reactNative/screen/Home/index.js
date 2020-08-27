import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { View } from "react-native";
import Alone from "../Alone";
import Together from "../Together";
import Invite from "../Together/Invite";
import WaitingRoomForStart from "../Together/WaitingRoomForStart";
import GameRoom from "../Together/GameRoom";
import WaitingRoomForResult from "../Together/WaitingRoomForResult";
import GameResult from "../Together/GameResult";

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
        <Stack.Screen
          name="Invite"
          component={Invite}
          options={{
            headerShown: true,
            title: "초대하기",
          }}
          // initialParams={route.params}
        />
        <Stack.Screen
          name="WaitingRoomForStart"
          component={WaitingRoomForStart}
          options={{
            headerShown: true,
            title: "대기실",
            headerTitleAlign: "center",
            headerLeft: () => <View />,
          }}
        />
        <Stack.Screen
          name="GameRoom"
          component={GameRoom}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="WaitingRoomForResult"
          component={WaitingRoomForResult}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="GameResult"
          component={GameResult}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
