import React from 'react';
import { TextInput } from 'react-native';

import { apis } from '../api';

export default ({
  placeholder,
  onChangeText,
  onSubmitEditing,
  value,
  setRestaurant,
  userLocation,
}) => {
  // console.log(userLocation);

  return (
    <TextInput
      style={{
        width: '90%',
        height: 30,
        backgroundColor: '#F2F2F2',
        borderRadius: 10,
        padding: 10,
        marginBottom: 10,
      }}
      onChangeText={onChangeText}
      placeholder={placeholder}
      onSubmitEditing={async () => {
        // const userLocation = {
        //   latitude: location.coords.latitude,
        //   longitude: location.coords.longitude,
        // };
        const userLocation = {
          latitude: 37.5447048,
          longitude: 127.0663154,
        };
        const result = await apis.searchRestaurant(
          value,
          userLocation.latitude,
          userLocation.longitude
        );

        // console.log(result.data.data.restaurants.content);
        setRestaurant(result.data.data.restaurants.content);
      }}
    />
  );
};
