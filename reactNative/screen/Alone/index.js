import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import MainContainer from './MainContainer';
import MapView from './MapView';
import Mypage from './Mypage';
import NameEdit from './NameEdit';
const Stack = createStackNavigator();

export default ({ navigation, route }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Main"
        component={MainContainer}
        options={{
          headerShown: false,
        }}
        initialParams={{
          userToken: route.params.userToken,
        }}
      />
      <Stack.Screen
        name="Mypage"
        component={Mypage}
        options={{
          title: '',
          headerBackTitle: '뒤로',
        }}
      />
      <Stack.Screen name="NameEdit" component={NameEdit} />
      <Stack.Screen
        name="MapView"
        component={MapView}
        options={{
          title: '지도',
          headerBackTitle: '뒤로',
        }}
      />
    </Stack.Navigator>
  );
};
