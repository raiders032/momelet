import { StackActions } from '@react-navigation/native';
import * as Location from 'expo-location';
import React, { useState, useEffect, useRef } from 'react';

import { apis } from '../../../api';
import socket from '../../../socket';
import getInvalidToken from '../../../utils/getInvalidToken';
import printSocketEvent from '../../../utils/printEvent';
import GameRoomPresenter from './GameRoomPresenter';

export default ({ navigation, route }) => {
  // const latitude = 37.5447048;
  // const longitude = 127.0663154;
  const BookmarkArrayId = useRef([]);
  const [userLocation, setUserLocation] = useState({ latitude: 0, longitude: 0 });
  const restaurants = route.params.msg.restaurants;
  const [gameReadyAndMessage, setGameReadyAndMessage] = useState({
    isReady: 1,
    message: '준비~',
  });
  const getBookMarkAndLocation = async () => {
    const response = await apis.getBookmark();
    const location = await Location.getCurrentPositionAsync({});

    response.data.data.bookmarks.content.map((obj) => {
      // console.log('obj: ', obj);
      BookmarkArrayId.current.push(obj.restaurantId);
    });
    setUserLocation({ latitude: location.coords.latitude, longitude: location.coords.longitude });
    // BookMarkArrayId.current = response.data.data.bookmarks.content;
    // console.log(response.data.data.bookmarks.content);
  };

  useEffect(() => {
    getBookMarkAndLocation();
  }, []);

  if (gameReadyAndMessage.isReady == 1) {
    setTimeout(() => {
      setGameReadyAndMessage({ isReady: 0, message: '시작!' });
    }, 1000);
  } else if (gameReadyAndMessage.isReady == 0) {
    setTimeout(() => {
      setGameReadyAndMessage({ isReady: -1, message: '0' });
    }, 500);
  }

  const gameFinish = async (gameResult) => {
    const jwt = await getInvalidToken();
    const sendMsg = {
      id: route.params.userId,
      userGameResult: gameResult.current,
      roomName: route.params.roomName,
      jwt,
    };

    socket.emit('gameUserFinish', JSON.stringify(sendMsg), (msg) => {
      printSocketEvent('gameUserFinish', msg);

      // restaurants.forEach((element) => console.log(element.id, element.name));

      navigation.dispatch(
        StackActions.replace('WaitingRoomForResult', {
          msg,
          restaurant: restaurants,
          userId: route.params.userId,
          roomName: route.params.roomName,
          userLocation,
        })
      );
    });
  };

  return (
    <GameRoomPresenter
      restaurants={restaurants}
      infoText={gameReadyAndMessage.message}
      zIndex={gameReadyAndMessage.isReady}
      gameFinish={gameFinish}
      userLocation={userLocation}
      // BookmarkArrayId={BookmarkArrayId}
    />
  );
};
