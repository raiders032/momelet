import React from 'react';
import { View, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default ({ name, onPress, style }) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        // justifyContent: 'center',
        backgroundColor: 'white',
        height: 25,
        // alignItems: 'center',
        alignItems: 'flex-end',
        borderRadius: 10,
        padding: 5,
        ...style,
      }}>
      <Text style={{ marginRight: 10 }}>{name}</Text>
      <TouchableOpacity onPress={onPress}>
        <Text>X</Text>
      </TouchableOpacity>
    </View>
  );
};
