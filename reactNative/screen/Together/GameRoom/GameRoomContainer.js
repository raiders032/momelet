import { StackActions } from '@react-navigation/native';
import React, { useState } from 'react';

import socket from '../../../socket';
import printSocketEvent from '../../../utils/printEvent';
import GameRoomPresenter from './GameRoomPresenter';

export default ({ navigation, route }) => {
  console.log('게임룸(컨테이너) 렌더');

  const latitude = 37.5447048;
  const longitude = 127.0663154;
  const userLocation = { latitude, longitude };
  const restaurants = route.params.msg.restaurants;
  const [gameReadyAndMessage, setGameReadyAndMessage] = useState({
    isReady: 1,
    message: '준비~',
  });

  if (gameReadyAndMessage.isReady == 1) {
    setTimeout(() => {
      setGameReadyAndMessage({ isReady: 0, message: '시작!' });
    }, 1000);
  } else if (gameReadyAndMessage.isReady == 0) {
    setTimeout(() => {
      setGameReadyAndMessage({ isReady: -1, message: '0' });
    }, 500);
  }

  const gameFinish = (gameResult) => {
    const sendMsg = {
      id: route.params.userId,
      userGameResult: gameResult.current,
      roomName: route.params.roomName,
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
    />
  );
};
