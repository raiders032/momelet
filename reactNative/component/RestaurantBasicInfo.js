import React from 'react';
import { View, Text } from 'react-native';

import truncate from '../utils/truncate';
import Distance from './Distance';
import Rating from './Rating';

export default ({ title, distance, point }) => {
  return (
    <View>
      <View style={{ flexDirection: 'row', marginVertical: 5 }}>
        <View style={{ marginRight: 4 }}>
          <Text style={{ fontSize: 17 }}>{truncate(title, 10)}</Text>
        </View>
        <Distance style={{ width: 55 }} distance={distance} />
      </View>
      <Rating rating={point} scale={15} />
    </View>
  );
};
