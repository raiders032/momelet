import React from 'react';
import { Dimensions, Image, Text, TouchableOpacity, View } from 'react-native';

import imageResize from '../utils/imageResize';
import Distance from './Distance';
import Rating from './Rating';

const { width: WIDTH, height: HEIGHT } = Dimensions.get('window');
export default ({ name, like, thumUrl, distance, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={{
          width: WIDTH / 2.2,
          height: WIDTH / 1.7,
          // backgroundColor: 'blue',
          marginBottom: 10,
        }}>
        <Image
          source={{
            uri: imageResize(thumUrl),
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
          <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{name}</Text>
          <TouchableOpacity>
            <Image
              source={require('../assets/heart.png')}
              style={{ width: 20, height: 20, resizeMode: 'center' }}
            />
          </TouchableOpacity>
        </View>
        <View style={{ paddingHorizontal: 5, marginTop: 5, flexDirection: 'row' }}>
          <Rating rating={like} scale={15} />
          <Distance distance={distance} style={{ width: 50, height: 20 }} />
        </View>
      </View>
    </TouchableOpacity>
  );
};
