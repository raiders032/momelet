import React, { useContext, useState } from 'react';
import { View, Text, Image, Dimensions, TouchableOpacity, ScrollView } from 'react-native';

import BookMarkRestaurant from '../../../component/BookMarkRestaurant';
import { Context } from '../../../store';
import { calculateDistance } from '../../../utils/calculateDistance';

const { width: WIDTH, height: HEIGHT } = Dimensions.get('window');
export default ({ user, onClickEditProfileButton, bookmarkRestaurant, userLocation }) => {
  // console.log('userLocation: ', userLocation);
  // console.log('BookmarkRestaurant: ', bookmarkRestaurant);

  const [filterSelected, setFilterSelected] = useState(0);

  return (
    <ScrollView>
      <View style={{ width: '100%', height: '100%', backgroundColor: 'white' }}>
        <View
          style={{
            height: HEIGHT / 3,
            // backgroundColor: 'red',
            justifyContent: 'flex-end',
            alignItems: 'center',
            borderBottomWidth: 0.3,
            paddingBottom: 15,
            borderColor: 'grey',
          }}>
          <Image
            source={{ uri: user.imageUrl }}
            style={{ width: WIDTH / 5, height: WIDTH / 5, borderRadius: 20 }}
          />
          <Text style={{ fontSize: 18, marginTop: 15 }}>{user.name}</Text>
          <TouchableOpacity onPress={onClickEditProfileButton}>
            <View
              style={{
                width: WIDTH / 4,
                height: 30,
                marginTop: 10,
                justifyContent: 'center',
                alignItems: 'center',
                borderWidth: 0.3,
                borderRadius: 5,
              }}>
              <Text>프로필 편집</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View
          style={{
            flex: 1,
            padding: 10,
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
          }}>
          <View
            style={{
              justifyContent: 'center',

              backgroundColor: 'white',
              width: '100%',
              height: 50,
              borderRadius: 25,
              elevation: 8,
              shadowColor: 'black',
              shadowOpacity: 0.1,
              shadowOffset: { width: 5, height: 5 },
              marginBottom: 15,
              flexDirection: 'row',
            }}>
            <TouchableOpacity
              style={{ width: '34%', height: '100%' }}
              onPress={() => {
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
              style={{ width: '34%', height: '100%' }}
              onPress={() => {
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
            <TouchableOpacity
              style={{ width: '34%', height: '100%' }}
              onPress={() => {
                setFilterSelected(2);
              }}>
              <View
                style={{
                  width: '100%',
                  backgroundColor: filterSelected === 2 ? '#FFF271' : 'white',
                  height: '100%',
                  borderRadius: 25,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    color: filterSelected === 2 ? 'white' : 'black',
                    fontSize: 18,
                    fontWeight: filterSelected === 2 ? 'bold' : '300',
                  }}>
                  최근등록순
                </Text>
              </View>
            </TouchableOpacity>
          </View>
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
              />
            );
          })}
          {/* <BookMarkRestaurant />
          <BookMarkRestaurant />
          <BookMarkRestaurant />
          <BookMarkRestaurant />
          <BookMarkRestaurant />
          <BookMarkRestaurant /> */}
        </View>
      </View>
    </ScrollView>
  );
};
