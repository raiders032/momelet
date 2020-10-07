import React from 'react';
import { View, Text } from 'react-native';

export default () => {
  return (
    <View
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: '#fff271',
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text
        style={{
          fontStyle: 'normal',
          lineHeight: 18,
          color: '#3b3b3b',
        }}>
        메뉴보기
      </Text>
    </View>
  );
};
