import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect } from 'react';
import { View } from 'react-native';

import Alone from '../Alone';
import Together from '../Together';
import GameResult from '../Together/GameResult';
import GameRoom from '../Together/GameRoom';
import Invite from '../Together/Invite';
import WaitingRoomForResult from '../Together/WaitingRoomForResult';
import WaitingRoomForStart from '../Together/WaitingRoomForStart';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Alone"
          component={Alone}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen name="Together" component={Together} options={{ headerShown: false }} />
        <Stack.Screen
          name="Invite"
          component={Invite}
          options={{
            headerShown: true,
            title: '초대하기',
          }}
          // initialParams={route.params}
        />
        <Stack.Screen
          name="WaitingRoomForStart"
          component={WaitingRoomForStart}
          options={{
            headerShown: true,
            title: '대기실',
            headerTitleAlign: 'center',
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
