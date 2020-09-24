import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';

import Basic from './Basic';
import Card from './Card';

export default ({ setTmpConnect, setIsChanged }) => {
  // const latitude = 37.5447048;
  // const longitude = 127.0663154;

  return (
    <View
      style={{
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Card style={{ justifyContent: 'center', alignItems: 'center' }}>
        <Image source={require('../assets/momulet.png')} />
        <Text style={{ fontFamily: 'Godo', fontSize: 24, marginTop: 10 }}>식당 카드를</Text>
        <TouchableOpacity
          onPress={() => {
            // setTmpConnect(true);
            // setIsChanged((before) => before + 1);
          }}>
          <Text style={{ fontFamily: 'Godo', fontSize: 24 }}>찾을 수 없습니다.</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            console.log('hello');
          }}>
          <View style={{ marginTop: 10, width: 10, height: 10 }} />
        </TouchableOpacity>
      </Card>
    </View>
  );
};
