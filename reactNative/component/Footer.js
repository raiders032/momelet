import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
export default ({ text, onClick, style, activation = true }) => {
  return (
    <TouchableOpacity onPress={onClick} disabled={!activation}>
      <View
        style={{
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          // backgroundColor: { footerColor },
          backgroundColor: '#fff271',
          // backgroundColor: { footerColor },
          ...style,
        }}>
        <Text style={{ fontFamily: 'Godo', fontSize: 24 }}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
};
