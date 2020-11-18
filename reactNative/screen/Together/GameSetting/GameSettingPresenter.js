import React, { useState } from 'react';
import { Dimensions, ScrollView, Text, TouchableOpacity, View } from 'react-native';

import Basic from '../../../component/Basic';
import BookMarkRestaurant from '../../../component/BookMarkRestaurant';
import ChoosenRestaurant from '../../../component/ChoosenRestaurant';
import Distance from '../../../component/Distance';
import Footer from '../../../component/Footer';
import MyTextInput from '../../../component/MyTextInput';
import SearchRestaurant from '../../../component/SearchRestaurant';
import socket from '../../../socket';
import { calculateDistance } from '../../../utils/calculateDistance';
import printSocketEvent from '../../../utils/printEvent';
import Bookmark from '../../Alone/Bookmark';
import Search from '../../Alone/Search';

const { width: WIDTH, height: HEIGHT } = Dimensions.get('window');
export default ({ bookmarkRestaurant, userLocation, myId, roomName, navigation }) => {
  // console.log('bookmarkRestaurant: ', bookmarkRestaurant);
  const [searchRestaurant, setSearchRestaurant] = useState([]);
  const [value, setValue] = useState('');
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
            {choosenRestaurants.map((obj, idx) => {
              return (
                <ChoosenRestaurant
                  key={idx}
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
          {filterSelected == 0 ? (
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
                paddingHorizontal: 10,
              }}>
              {bookmarkRestaurant?.map((restaurant) => {
                const distance = calculateDistance(userLocation, {
                  latitude: restaurant.latitude,
                  longitude: restaurant.longitude,
                });

                return (
                  <BookMarkRestaurant
                    key={restaurant.id}
                    name={restaurant.name}
                    thumUrl={restaurant.thumUrl}
                    like={restaurant.likecnt}
                    distance={distance}
                    onPress={() => {
                      if (choosenRestaurants.length >= 2) {
                        alert('식당은 최대 2개까지 선택 가능합니다.');
                      } else {
                        setChoosenRestaurants((before) => {
                          return [
                            ...before,
                            { name: restaurant.name, id: restaurant.restaurantId },
                          ];
                        });
                      }
                    }}
                  />
                );
              })}
            </View>
          ) : (
            <View style={{ width: '100%', height: '100%' }}>
              <View
                style={{
                  width: '100%',
                  height: 30,
                  // padding: 10,
                  alignItems: 'center',
                  // marginBottom: 10,
                }}>
                <MyTextInput
                  placeholder="식당 이름을 검색해주세요"
                  onChangeText={(text) => setValue(text)}
                  value={value}
                  setRestaurant={setSearchRestaurant}
                  userLocation={userLocation}
                />
              </View>
              <View style={{ flex: 1, padding: 10 }}>
                {searchRestaurant?.map((obj, index) => {
                  console.log('obj: ', obj);

                  return (
                    <SearchRestaurant
                      thumUrl={obj.thumUrl}
                      name={obj.name}
                      key={index}
                      menu={obj.menu}
                      like={obj.like}
                      userLocation={userLocation}
                      restaurantLocation={{ latitude: obj.latitude, longitude: obj.longitude }}
                      onPress={() => {
                        if (choosenRestaurants.length >= 2) {
                          alert('식당은 최대 2개까지 선택 가능합니다.');
                        } else {
                          setChoosenRestaurants((before) => {
                            console.log(obj);

                            return [...before, { name: obj.name, id: obj.id }];
                          });
                        }
                      }}
                    />
                  );
                })}
              </View>
            </View>
          )}
        </View>
      </ScrollView>
    </Basic>
  );
};
