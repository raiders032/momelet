import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView, Dimensions } from 'react-native';

import Basic from '../../../component/Basic';
import MyTextInput from '../../../component/MyTextInput';
import SearchRestaurant from '../../../component/SearchRestaurant';

export default ({ onSubmit, userLocation }) => {
  const [value, setValue] = useState('');
  const [restaurant, setRestaurant] = useState([]);

  return (
    <Basic style={{ backgroundColor: 'white' }}>
      <Text
        style={{
          marginLeft: 20,
          marginTop: 30,
          marginBottom: 10,
          fontSize: 25,
          fontWeight: 'bold',
        }}>
        검색
      </Text>
      <View
        style={{
          width: '100%',
          height: '100%',
          alignItems: 'center',
          padding: 10,
        }}>
        <MyTextInput
          placeholder="식당 이름을 검색해주세요"
          onChangeText={(text) => setValue(text)}
          value={value}
          setRestaurant={setRestaurant}
          userLocation={userLocation}
        />
        <ScrollView style={{ width: '100%', height: '100%', padding: 10 }}>
          {restaurant.map((obj, index) => {
            return (
              <SearchRestaurant
                thumUrl={obj.thumUrl}
                name={obj.name}
                key={index}
                userLocation={userLocation}
                restaurantLocation={{ latitude: obj.latitude, longitude: obj.longitude }}
              />
            );
          })}
        </ScrollView>
      </View>
    </Basic>
  );
};
