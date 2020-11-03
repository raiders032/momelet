import React from 'react';
import { Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default () => {
  return (
    <TouchableOpacity>
      <View
        style={{
          width: 24,
          height: 24,
          backgroundColor: '#FFF271',
          borderRadius: 12,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={{ fontWeight: 'bold', color: 'white' }}>v</Text>
      </View>
    </TouchableOpacity>
  );
};
