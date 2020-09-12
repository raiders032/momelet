import React from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
export default ({ size, image, categoryName, onPress }) => {
  return (
    <TouchableOpacity onPress={() => onPress(categoryName)}>
      <View
        style={{
          width: size / 1.2,
          height: size / 1.2,
          borderWidth: 0.6,
          borderColor: '#e4e4e4',
          borderRadius: 10,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image
          source={image}
          style={{
            width: size / 2,
            height: size / 2,
          }}
        />

        <Text
          style={{
            color: '#9f9f9f',
            fontSize: size / 7,
          }}>
          {categoryName}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
