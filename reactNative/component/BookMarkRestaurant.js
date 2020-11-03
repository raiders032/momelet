import React from 'react';
import { Dimensions, Image, Text, TouchableOpacity, View } from 'react-native';

import Distance from './Distance';
import Rating from './Rating';

const { width: WIDTH, height: HEIGHT } = Dimensions.get('window');
export default () => {
  return (
    <TouchableOpacity>
      <View
        style={{
          width: WIDTH / 2.2,
          height: WIDTH / 1.7,

          marginBottom: 10,
        }}>
        <Image
          source={{
            uri:
              'https://dimg.donga.com/a/500/0/90/5/ugc/CDB/29STREET/Article/5e/b2/04/e8/5eb204e81752d2738236.jpg',
          }}
          style={{ width: WIDTH / 2.2, height: WIDTH / 2.3, borderRadius: 20 }}
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 5,
            alignItems: 'center',
            marginTop: 7,
          }}>
          <Text style={{ fontSize: 16, fontWeight: 'bold' }}>착한피자 사당방배점</Text>
          <TouchableOpacity>
            <Image
              source={require('../assets/heart.png')}
              style={{ width: 20, height: 20, resizeMode: 'center' }}
            />
          </TouchableOpacity>
        </View>
        <View style={{ paddingHorizontal: 5, marginTop: 5, flexDirection: 'row' }}>
          <Rating rating="4.5" scale={15} />
          <Distance distance="300M" style={{ width: 50, height: 20 }} />
        </View>
      </View>
    </TouchableOpacity>
  );
};
