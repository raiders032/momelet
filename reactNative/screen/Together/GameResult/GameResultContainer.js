import { StackActions } from '@react-navigation/native';
import React, { useEffect } from 'react';

import socket from '../../../socket';
import printSocketEvent from '../../../utils/printEvent';
import GameResultPresenter from './GameResultPresenter';

export default ({ navigation, route }) => {
  // useEffect(() => {
  //   return () => {
  //     const sendMsg = {
  //       id: route.params.userId,
  //       roomName: route.params.roomName,
  //     };
  //     // console.log(sendMsg);
  //     socket.emit("gameRoomLeave", JSON.stringify(sendMsg), (msg) => {
  //       console.log("leavemsg", msg);
  //     });
  //   };
  // }, []);

  // console.log(route.params);
  const resultId = route.params.msg.roomGameResult.id;
  let isSendMsg = false;
  const result = route.params.restaurant.filter((restaurant) => {
    return restaurant.id == resultId;
  });
  // console.log("result: ", result);
  const onClick = () => {
    const sendMsg = {
      id: route.params.userId,
      roomName: route.params.roomName,
    };

    // console.log(sendMsg);
    socket.emit('gameRoomLeave', JSON.stringify(sendMsg), (msg) => {
      printSocketEvent('gameRoomLeave', msg);
    });
    navigation.navigate('Main');
  };
  const footerClick = () => {
    if (isSendMsg) return;

    isSendMsg = true;

    const sendMsg = {
      id: route.params.userId,
      roomName: route.params.roomName,
    };

    socket.emit('gameRoomJoinAgain', JSON.stringify(sendMsg), (msg) => {
      printSocketEvent('gameROmmJoinAgain', msg);

      const newMsg = {
        ...JSON.parse(msg).data,
        roomName: route.params.roomName,
      };

      navigation.dispatch(
        StackActions.replace('WaitingRoomForStart', {
          msg: newMsg,
          myId: route.params.userId,
        })
      );
    });
  };

  return (
    <GameResultPresenter
      result={result[0]}
      total={route.params.msg.roomGameResult.headCount}
      selected={route.params.msg.roomGameResult.likeCount}
      onClick={onClick}
      footerClick={footerClick}
      userLocation={route.params.userLocation}
    />
  );
};
