import * as Location from 'expo-location';
import React, { useEffect, useState } from 'react';

import { apis } from '../../../api';
import socket from '../../../socket';
import GameSettingPresenter from './GameSettingPresenter';

export default ({ navigation, route }) => {
  console.log('route In GameSetting: ', route);

  const [userLocation, setUserLocation] = useState(null);
  const [bookmarkRestaurant, setBookmarkRestaurant] = useState([]);
  const getBookmarkRestaurant = async () => {
    const result = await apis.getBookmark();
    const location = await Location.getCurrentPositionAsync({});

    // console.log(location);
    console.log('zz', result.data.data.bookmarks.content);
    setUserLocation({ latitude: location.coords.latitude, longitude: location.coords.longitude });

    setBookmarkRestaurant(result.data.data.bookmarks.content);
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
