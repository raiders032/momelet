import * as Location from 'expo-location';
import React, { useContext, useEffect, useRef, useState } from 'react';

import { apis } from '../../../api';
import Distance from '../../../component/Distance';
import { Context } from '../../../store';
import { calculateDistance } from '../../../utils/calculateDistance';
import BookmarkPresenter from './BookmarkPresenter';

export default ({ navigation }) => {
  const { state } = useContext(Context);
  const [bookmarkRestaurant, setBookmarkRestaurant] = useState([]);
  const [userLocation, setUserLocation] = useState({ latitude: 0, longitude: 0 });
  const RestaurantOrderByLike = useRef([]);
  const RestaurantOrderById = useRef([]);
  const RestaurantOrderByDistance = useRef([]);
  const getBookmarkRestaurant = async () => {
    const resultOrderByLike = await apis.getBookmark('like');

    RestaurantOrderByLike.current = resultOrderByLike.data.data.bookmarks.content;

    const resultOrderById = await apis.getBookmark('id');

    RestaurantOrderById.current = resultOrderById.data.data.bookmarks.content;

    const location = await Location.getCurrentPositionAsync({});
    const result = await apis.getBookmark('id');

    const resultOrderByDistance = result.data.data.bookmarks.content.sort((a, b) => {
      // console.log('a', resultOrderByDistance);

      const distanceA = calculateDistance(
        { latitude: location.coords.latitude, longitude: location.coords.longitude },
        { latitude: a.latitude, longitude: a.longitude }
      );
      const distanceB = calculateDistance(
        { latitude: location.coords.latitude, longitude: location.coords.longitude },
        { latitude: b.latitude, longitude: b.longitude }
      );

      if (
        distanceA.substring(0, distanceA.length - 1) * 1 >
        distanceB.substring(0, distanceB.length - 1) * 1
      )
        return 1;

      if (
        distanceA.substring(0, distanceA.length - 1) * 1 <
        distanceB.substring(0, distanceB.length - 1) * 1
      )
        return -1;

      return 0;
    });

    RestaurantOrderByDistance.current = resultOrderByDistance;
    // console.log(RestaurantOrderByDistance);
    console.log('RestaurantOrderByDistance: ', RestaurantOrderByDistance);
    // console.log(resultOrderByDistance);
    // console.log(location);
    console.log('location: ', location);
    // console.log('zz', result.data.data.bookmarks.content);
    setUserLocation({ latitude: location.coords.latitude, longitude: location.coords.longitude });
    setBookmarkRestaurant(resultOrderById.data.data.bookmarks.content);
    // setBookmarkRestaurant(resultOrderByDistance);
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
      setBookmarkRestaurant={setBookmarkRestaurant}
      RestaurantOrderByLike={RestaurantOrderByLike}
      RestaurantOrderById={RestaurantOrderById}
      RestaurantOrderByDistance={RestaurantOrderByDistance}
    />
  );
};
