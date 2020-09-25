import React from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';

import Basic from '../../../component/Basic';
import Empty from '../../../component/Empty';
import RestaurantsSwipe from '../../../component/RestaurantsSwipe';
import socket from '../../../socket';
import logging from '../../../utils/logging';

export default ({
  restaurants,
  navigation,
  user,
  sendTogetherMessage,
  coverMessageConfig,
  userChangeCount,
  userLocation,
}) => {
  const msg = { id: 2, latitude: 37.5, longitude: 127.49999 };

  const footer = (
    <View
      style={{
        justifyContent: 'space-between',
        // alignItems: "center",
        height: '100%',
        flexDirection: 'row',
        // padding: 20,
      }}>
      <TouchableOpacity
        onPress={sendTogetherMessage}
        style={{
          height: '100%',
          justifyContent: 'center',
          paddingLeft: 20,
          paddingRight: 20,
        }}>
        <Text style={{ fontFamily: 'Godo' }}>같이하기</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={async () => {
          logging({
            eventName: 'BTN_MYPAGE',
            config: {
              name: 'mypaegButton',
              screen: 'Home',
              purpose: 'how often clicked button mypage',
            },
          });
          navigation.navigate('Mypage', {
            user: user.data.userInfo,
            userChangeCount,
          });
        }}
        // onPress={sendTmpMsg3}
        style={{
          justifyContent: 'center',
          paddingLeft: 20,
          paddingRight: 20,
        }}>
        <Text style={{ fontFamily: 'Godo' }}>내 설정</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <Basic
      footer={footer}
      zIndex={coverMessageConfig.zIndex}
      coverMessageConfig={coverMessageConfig}>
      {}
      {!restaurants || restaurants.length <= 0 ? (
        <Empty />
      ) : restaurants.length > 0 ? (
        <RestaurantsSwipe restaurants={restaurants} userLocation={userLocation} />
      ) : (
        <View />
      )}
    </Basic>
  );
};
