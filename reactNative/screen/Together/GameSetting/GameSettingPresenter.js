import React, { useState } from 'react';
import { Dimensions, ScrollView, Text, TouchableOpacity, View } from 'react-native';

import Basic from '../../../component/Basic';
import BookMarkRestaurant from '../../../component/BookMarkRestaurant';
import ChoosenRestaurant from '../../../component/ChoosenRestaurant';
import Distance from '../../../component/Distance';
import Footer from '../../../component/Footer';
import socket from '../../../socket';
import { calculateDistance } from '../../../utils/calculateDistance';
import printSocketEvent from '../../../utils/printEvent';
import Bookmark from '../../Alone/Bookmark';

const { width: WIDTH, height: HEIGHT } = Dimensions.get('window');
export default ({ bookmarkRestaurant, userLocation, myId, roomName, navigation }) => {
  // console.log('bookmarkRestaurant: ', bookmarkRestaurant);

  const [filterSelected, setFilterSelected] = useState(0);
  const [choosenRestaurants, setChoosenRestaurants] = useState([]);
  const footer = (
    <Footer
      onClick={() => {
        const restaurantIds = [];

        choosenRestaurants.map((obj) => {
          restaurantIds.push(obj.id);
        });
        // console.log(sendArray);
        socket.emit(
          'selectRestaurantCard',
          JSON.stringify({ id: myId, roomName, restaurantIds }),
          (msg) => {
            printSocketEvent('selectRestaurantCard', msg);
            navigation.goBack();
          }
        );
      }}
      text="설정완료"
    />
  );

  return (
    <Basic footer={footer} style={{ backgroundColor: '#F7F7F7' }}>
      <ScrollView>
        <View style={{ width: '100%', height: '100%', alignItems: 'center' }}>
          <View
            style={{
              width: WIDTH / 1.1,
              height: HEIGHT / 12,
              backgroundColor: 'white',
              marginTop: 10,
              borderRadius: 30,
              elevation: 8,
              shadowColor: 'black',
              shadowOpacity: 0.1,
              shadowOffset: { width: 5, height: 5 },
              flexDirection: 'row',
            }}>
            <TouchableOpacity
              style={{ width: '50%', height: '100%' }}
              onPress={() => {
                setFilterSelected(0);
              }}>
              <View
                style={{
                  height: '100%',
                  width: '100%',
                  backgroundColor: filterSelected === 0 ? '#FFF271' : 'white',
                  borderRadius: 30,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text>즐겨찾기</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ width: '50%', height: '100%' }}
              onPress={() => {
                setFilterSelected(1);
              }}>
              <View
                style={{
                  height: '100%',
                  width: '100%',
                  backgroundColor: filterSelected === 1 ? '#FFF271' : 'white',
                  borderRadius: 30,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text>검색</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View
            style={{
              width: '100%',
              height: 40,
              flexDirection: 'row',
              alignItems: 'center',
              padding: 10,
            }}>
            {choosenRestaurants.map((obj) => {
              return (
                <ChoosenRestaurant
                  name={obj.name}
                  style={{ marginLeft: 10 }}
                  onPress={() => {
                    const newObj = choosenRestaurants.filter((res) => {
                      return res.id != obj.id;
                    });

                    setChoosenRestaurants(newObj);
                  }}
                />
              );
            })}
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              paddingHorizontal: 10,
            }}>
            {bookmarkRestaurant.map((restaurant) => {
              const distance = calculateDistance(userLocation, {
                latitude: restaurant.latitude,
                longitude: restaurant.longitude,
              });

              return (
                <BookMarkRestaurant
                  key={restaurant.id}
                  name={restaurant.name}
                  thumUrl={restaurant.thumUrl}
                  like={restaurant.like}
                  distance={distance}
                  onPress={() => {
                    if (choosenRestaurants.length >= 2) {
                      alert('식당은 최대 2개까지 선택 가능합니다.');
                    } else {
                      setChoosenRestaurants((before) => {
                        return [...before, { name: restaurant.name, id: restaurant.restaurantId }];
                      });
                    }
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
