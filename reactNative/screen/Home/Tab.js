import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// import * as Analytics from 'expo-firebase-analytics';
import React from 'react';
import { Image } from 'react-native';

import Store, { Context } from '../../store';
import Bookmark from '../Alone/Bookmark';
import Main from '../Alone/Main';
import Mypage from '../Alone/Mypage';
import Search from '../Alone/Search';
import EventAdder from '../Together/EventAdder';

const Tab = createBottomTabNavigator();

function TabBar() {
  return (
    <Tab.Navigator tabBarOptions={{ showLabel: true }}>
      <Tab.Screen
        name="Main"
        component={Main}
        options={{
          // unmountOnBlur: true,
          title: '홈',
          tabBarIcon: ({ focused }) => {
            if (focused) {
              return (
                <Image
                  source={require('../../assets/homeIconFocused.png')}
                  style={{ width: 30, height: 30, resizeMode: 'contain' }}
                />
              );
            } else {
              return (
                <Image
                  source={require('../../assets/homeIconUnFocused.png')}
                  style={{ width: 30, height: 30, resizeMode: 'contain' }}
                />
              );
            }
          },
        }}
      />
      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          unmountOnBlur: true,
          title: '검색',
          tabBarIcon: ({ focused }) => {
            if (focused) {
              return (
                <Image
                  source={require('../../assets/searchFocused.png')}
                  style={{ width: 30, height: 30, resizeMode: 'contain' }}
                />
              );
            } else {
              return (
                <Image
                  source={require('../../assets/searchUnFocused.png')}
                  style={{ width: 30, height: 30, resizeMode: 'contain' }}
                />
              );
            }
          },
        }}
      />
      <Tab.Screen
        name="Together"
        component={EventAdder}
        options={{
          tabBarVisible: false,
          unmountOnBlur: true,
          title: '초대',
          tabBarIcon: ({ focused }) => {
            if (focused) {
              return (
                <Image
                  source={require('../../assets/homeIconFocused.png')}
                  style={{ width: 30, height: 30, resizeMode: 'contain' }}
                />
              );
            } else {
              return (
                <Image
                  source={require('../../assets/homeIconUnFocused.png')}
                  style={{ width: 30, height: 30, resizeMode: 'contain' }}
                />
              );
            }
          },
        }}
      />
      <Tab.Screen
        name="Bookmark"
        component={Bookmark}
        options={{
          title: '즐겨찾기',
          unmountOnBlur: true,
          tabBarIcon: ({ focused }) => {
            if (focused) {
              return (
                <Image
                  source={require('../../assets/bookmarkFocused.png')}
                  style={{ width: 30, height: 30, resizeMode: 'contain' }}
                />
              );
            } else {
              return (
                <Image
                  source={require('../../assets/bookmarkUnFocused.png')}
                  style={{ width: 30, height: 30, resizeMode: 'contain' }}
                />
              );
            }
          },
        }}
      />
    </Tab.Navigator>
  );
}

export default TabBar;
