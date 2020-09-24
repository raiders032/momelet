import React from 'react';
import { View } from 'react-native';

export default ({ children, style }) => {
  return (
    <View
      style={{
        backgroundColor: 'white',
        height: '85%',
        width: '87%',
        borderRadius: 20,
        shadowOffset: { width: 4, height: 5 },
        shadowOpacity: 2,
        shadowColor: 'grey',
        elevation: 15,
        ...style,
      }}>
      {children}
    </View>
  );
};
