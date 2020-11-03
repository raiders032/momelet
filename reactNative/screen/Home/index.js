import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
// import * as Analytics from 'expo-firebase-analytics';
import React, { useEffect } from 'react';
import { View, Image } from 'react-native';

import Store, { Context } from '../../store';
import Bookmark from '../Alone/Bookmark';
import Main from '../Alone/Main';
import MyPage from '../Alone/Mypage';
import NameEdit from '../Alone/NameEdit';
import Search from '../Alone/Search';
import Together from '../Together';
import GameResult from '../Together/GameResult';
import GameRoom from '../Together/GameRoom';
import Invite from '../Together/Invite';
import WaitingRoomForResult from '../Together/WaitingRoomForResult';
import WaitingRoomForStart from '../Together/WaitingRoomForStart';
import TabBar from './Tab';

const Stack = createStackNavigator();

function App() {
  return (
    <Store>
      <NavigationContainer
        onStateChange={(prevState, newState) => {
          console.log(prevState.routes[prevState.index].name);
          // Analytics.setCurrentScreen(
          //   prevState.routes[prevState.index].name,
          //   prevState.routes[prevState.index].name
          // );
        }}>
        <Stack.Navigator>
          <Stack.Screen name="Tab" component={TabBar} options={{ headerShown: false }} />
          <Stack.Screen name="Mypage" component={MyPage} />
          <Stack.Screen name="Invite" component={Invite} options={{}} />
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

        {/* <Stack.Navigator>
        <Stack.Screen
          name="Main"
          component={Main}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Mypage"
          component={MyPage}
          options={{
            title: '',
            headerBackTitle: '뒤로',
          }}
        /> */}
        {/* <Stack.Screen
          name="Invite"
          component={Invite}
          options={{
            headerShown: true,
            title: '초대하기',
          }}
        />
        <Stack.Screen
          name="Search"
          component={Search}
          options={{
            headerShown: false,
            title: '검색하기',
          }}
        />
        <Stack.Screen
          name="Bookmark"
          component={Bookmark}
          options={{
            headerShown: true,
            title: '즐겨찾기',
          }}
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
      </Stack.Navigator> */}
      </NavigationContainer>
    </Store>
  );
}

export default App;
