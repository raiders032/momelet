import * as Location from 'expo-location';
import React, { useEffect, useState } from 'react';

import { apis } from '../../../api';
import socket from '../../../socket';
import { calculateDistance } from '../../../utils/calculateDistance';
import GameSettingPresenter from './GameSettingPresenter';

export default ({ navigation, route }) => {
  console.log('route In GameSetting: ', route);

  const [userLocation, setUserLocation] = useState(null);
  const [bookmarkRestaurant, setBookmarkRestaurant] = useState([]);
  const getBookmarkRestaurant = async () => {
    const result = await apis.getBookmark('like');
    const location = await Location.getCurrentPositionAsync({});

    // console.log(location);
    // console.log('zz', result.data.data.bookmarks.content);

    // console.log('result.data.data.bookmarks.content: ', result.data.data.bookmarks.content);
    // console.log(userLocation);

    const filteredWithDistance = result.data.data.bookmarks.content.filter((obj) => {
      const distance = calculateDistance(
        { latitude: location.coords.latitude, longitude: location.coords.longitude },
        {
          latitude: obj.latitude,
          longitude: obj.longitude,
        }
      );

      // console.log(distance.substring(0, distance.length - 1) * 1 >= 1300);

      if (distance.substring(0, distance.length - 1) * 1 <= 1300) {
        console.log('hello?');

        return obj;
      }

      // return obj;
      // console.log(filteredWithDistance);
    });

    // console.log('filteredWithDistance: ', filteredWithDistance);
    setBookmarkRestaurant(filteredWithDistance);
    setUserLocation({ latitude: location.coords.latitude, longitude: location.coords.longitude });
    // setBookmarkRestaurant(filteredWithDistance);
  };

  useEffect(() => {
    getBookmarkRestaurant();
  }, []);

  return (
    <GameSettingPresenter
      bookmarkRestaurant={bookmarkRestaurant}
      userLocation={userLocation}
      myId={route.params.myId}
      roomName={route.params.roomName}
      navigation={navigation}
    />
  );
};
