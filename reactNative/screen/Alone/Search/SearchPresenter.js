import React, { useRef, useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView, Dimensions } from 'react-native';

import { apis } from '../../../api';
import Basic from '../../../component/Basic';
import MyTextInput from '../../../component/MyTextInput';
import SearchRestaurant from '../../../component/SearchRestaurant';

export default ({ onSubmit, userLocation, navigation }) => {
  const [value, setValue] = useState('');
  const [restaurant, setRestaurant] = useState([]);
  const [filterSelected, setFilterSelected] = useState(0);
  const restaurantOrderByDistance = useRef([]);
  const restaurantOrderByLike = useRef([]);

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
      <ScrollView>
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
            restaurantOrderByDistance={restaurantOrderByDistance}
            restaurantOrderByLike={restaurantOrderByLike}
          />

          <View
            style={{
              justifyContent: 'center',
              alignSelf: 'center',
              backgroundColor: 'white',
              width: '95%',
              height: 50,
              borderRadius: 25,
              elevation: 6,
              shadowColor: 'black',
              shadowOpacity: 0.1,
              shadowOffset: { width: 1, height: 5 },
              marginBottom: 15,
              flexDirection: 'row',
            }}>
            <TouchableOpacity
              style={{ width: '50%', height: '100%' }}
              onPress={async () => {
                setRestaurant(restaurantOrderByDistance.current);
                setFilterSelected(0);
              }}>
              <View
                style={{
                  width: '100%',
                  backgroundColor: filterSelected === 0 ? '#FFF271' : 'white',
                  height: '100%',
                  borderRadius: 25,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    color: filterSelected === 0 ? 'white' : 'black',
                    fontSize: 18,
                    fontWeight: filterSelected === 0 ? 'bold' : '300',
                  }}>
                  거리순
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ width: '50%', height: '100%' }}
              onPress={() => {
                setRestaurant(restaurantOrderByLike.current);
                setFilterSelected(1);
              }}>
              <View
                style={{
                  width: '100%',
                  backgroundColor: filterSelected === 1 ? '#FFF271' : 'white',
                  height: '100%',
                  borderRadius: 25,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    color: filterSelected === 1 ? 'white' : 'black',
                    fontSize: 18,
                    fontWeight: filterSelected === 1 ? 'bold' : '300',
                  }}>
                  평점순
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={{ width: '100%', padding: 10 }}>
            {restaurant.map((obj, index) => {
              // console.log('obj: ', obj);

              return (
                <SearchRestaurant
                  thumUrl={obj.thumUrl}
                  name={obj.name}
                  key={index}
                  like={obj.like}
                  menu={obj.menu}
                  userLocation={userLocation}
                  restaurantLocation={{ latitude: obj.latitude, longitude: obj.longitude }}
                  onPress={() => {
                    navigation.navigate('oneCard', {
                      restaurant: obj,
                      isSelected: true,
                      userLocation,
                      fromHome: false,
                      fromSearch: true,
                    });
                  }}
                />
              );
            })}
          </View>
        </View>
      </ScrollView>
    </Basic>
  );
};
