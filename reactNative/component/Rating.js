import React from 'react';
import { Image, View, Text } from 'react-native';

export default ({ rating, scale }) => {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <Image
        source={require('../assets/star.png')}
        style={{ width: scale, height: scale, marginRight: 2 }}
      />
      <Text style={{ fontSize: scale, marginLeft: 2 }}>{rating}</Text>
    </View>
  );
};
