import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';

import Basic from './Basic';
import Card from './Card';
import Footer from './Footer';

export default ({}) => {
  // const latitude = 37.5447048;
  // const longitude = 127.0663154;
  const footer = <Footer style={{ backgroundColor: 'white' }} text="다시하기" />;

  return (
    <View style={{ flex: 1 }}>
      <Basic footer={footer}>
        <View
          style={{
            width: '100%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Card style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Image source={require('../assets/momulet.png')} />
            <Text style={{ fontFamily: 'Godo', fontSize: 24, marginTop: 10 }}>아무도 좋아요를</Text>

            <Text style={{ fontFamily: 'Godo', fontSize: 24 }}>누르지 않았어요 ㅠㅠ</Text>
          </Card>
        </View>
      </Basic>
    </View>
  );
};
