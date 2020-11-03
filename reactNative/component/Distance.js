import React from 'react';
import { Text, View } from 'react-native';

export default ({ style, distance }) => {
  return (
    <View
      style={{
        backgroundColor: '#e4e4e4',
        borderRadius: 4,
        width: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 5,
        ...style,
      }}>
      <Text style={{ fontSize: 12 }}>{distance}</Text>
    </View>
  );
};
