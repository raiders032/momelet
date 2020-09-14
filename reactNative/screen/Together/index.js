import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';

import GameResult from './GameResult';
import GameRoom from './GameRoom';
import Invite from './Invite';
import WaitingRoomForResult from './WaitingRoomForResult';
import WaitingRoomForStart from './WaitingRoomForStart';

const Stack = createStackNavigator();

export default ({ navigation, route }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Invite"
        component={Invite}
        options={{
          headerShown: true,
          title: '초대하기',
        }}
        initialParams={route.params}
      />
      <Stack.Screen
        name="WaitingRoomForStart"
        component={WaitingRoomForStart}
        options={{
          headerShown: true,
          title: '대기실',
          headerLeft: () => <View />,
          headerTitleAlign: 'center',
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
