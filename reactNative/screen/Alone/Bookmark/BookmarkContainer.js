import * as Location from 'expo-location';
import React, { useContext, useEffect, useRef, useState } from 'react';

import { apis } from '../../../api';
import { Context } from '../../../store';
import BookmarkPresenter from './BookmarkPresenter';

export default ({ navigation }) => {
  const { state } = useContext(Context);
  const [bookmarkRestaurant, setBookmarkRestaurant] = useState([]);
  const [userLocation, setUserLocation] = useState({});
  const getBookmarkRestaurant = async () => {
    const result = await apis.getBookmark();
    const location = await Location.getCurrentPositionAsync({});

    // console.log(location);
    // console.log('zz', result.data.data.bookmarks.content);
    setUserLocation({ latitude: location.coords.latitude, longitude: location.coords.longitude });
    setBookmarkRestaurant(result.data.data.bookmarks.content);
  };
  const onClickEditProfileButton = () => {
    navigation.navigate('Mypage');
  };

  useEffect(() => {
    getBookmarkRestaurant();
  }, []);

  return (
    <BookmarkPresenter
      bookmarkRestaurant={bookmarkRestaurant}
      user={state.user}
      onClickEditProfileButton={onClickEditProfileButton}
      userLocation={userLocation}
      navigation={navigation}
    />
  );
};
