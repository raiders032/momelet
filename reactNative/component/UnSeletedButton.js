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
          backgroundColor: 'white',
          borderRadius: 12,
          justifyContent: 'center',
          alignItems: 'center',
          borderWidth: 0.3,
          borderColor: 'grey',
        }}>
        <Text style={{ fontWeight: '100', color: 'black' }}>v</Text>
      </View>
    </TouchableOpacity>
  );
};
