import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Invite from "./Invite";
import WaitingRoomForStart from "./WaitingRoomForStart";
import GameRoom from "./GameRoom";
import WaitingRoomForResult from "./WaitingRoomForResult";
import GameResult from "./GameResult";
import { Text } from "react-native";

const Stack = createStackNavigator();
export default ({ navigation, route }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Invite"
        component={Invite}
        options={{
          headerShown: true,
          title: "초대하기",
        }}
        initialParams={route.params}
      />
      <Stack.Screen
        name="WaitingRoomForStart"
        component={WaitingRoomForStart}
        options={{
          headerShown: false,
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
  );
};
