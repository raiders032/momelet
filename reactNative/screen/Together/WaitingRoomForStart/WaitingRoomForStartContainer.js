import { StackActions } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';

import socket from '../../../socket';
import getInvalidToken from '../../../utils/getInvalidToken';
import printSocketEvent from '../../../utils/printEvent';
import WaitingRoomForStartPresenter from './WaitingRoomForStartPresenter';

export default ({ navigation, route }) => {
  // console.log(route);

  let isSendMsg = false;
  const [isGetRestaurantSuccess, setIsGetRestaurantSuccess] = useState(true);
  // let hostId = route.params.msg.hostId;
  const [hostId, setHostId] = useState(route.params.msg.hostId);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('GameSetting', {
              myId: route.params.myId,
              roomName: route.params.msg.roomName,
            })
          }>
          <Text style={{ marginLeft: 10 }}>설정하기</Text>
        </TouchableOpacity>
      ),
      headerRight: () => (
        <TouchableOpacity
          style={{ paddingRight: 10 }}
          onPress={() => {
            const sendMsg = {
              id: route.params.myId,
              roomName: route.params.msg.roomName,
            };

            socket.emit('gameRoomLeave', JSON.stringify(sendMsg), (msg) => {
              printSocketEvent('gameRoomLeave', msg);
            });
            navigation.navigate('Main');
          }}>
          <Text>나가기</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  const [users, setUsers] = useState(route.params.msg.gameRoomUserList);

  useEffect(() => {
    socket.on('gameRoomUpdate', (msg) => {
      printSocketEvent('gameRoomUpdate', msg);
      setHostId(JSON.parse(msg).data.hostId);
      console.log(hostId);
      setUsers(JSON.parse(msg).data.gameRoomUserList);
    });
    socket.on('gameStart', (msg) => {
      printSocketEvent('gameStart', '식당 정보 받아옴');

      const paseMsg = JSON.parse(msg);

      navigation.dispatch(
        StackActions.replace('GameRoom', {
          msg: paseMsg.data,
          roomName: route.params.msg.roomName,
          userId: route.params.myId,
        })
      );
    });
    // can't perform 에러 해결을 위한 코드
    // return () => {
    //   setUsers(null);
    // };
  }, []);

  const crewOnClick = (readyState = 0) => {
    socket.emit(
      'getReady',
      JSON.stringify({
        id: route.params.myId,
        roomName: route.params.msg.roomName,
        isReady: readyState,
      }),
      (msg) => {
        printSocketEvent('getReady', msg);
      }
    );
  };
  const onClick = async (latitude = 37.5447048, longitude = 127.0663154) => {
    if (isSendMsg) return;

    isSendMsg = true;

    const jwtToken = await getInvalidToken();

    socket.emit(
      'gameStart',
      JSON.stringify({
        id: route.params.myId,
        roomName: route.params.msg.roomName,
        radius: 0.01,
        latitude,
        longitude,
        jwt: jwtToken,
      }),
      async (msg) => {
        printSocketEvent('gameStart', msg);

        const paseMsg = JSON.parse(msg);

        if (!paseMsg.success) {
          setIsGetRestaurantSuccess(false);
        } else {
          navigation.dispatch(
            StackActions.replace('GameRoom', {
              msg: paseMsg.data,
              roomName: route.params.msg.roomName,
              userId: route.params.myId,
            })
          );
        }
      }
    );
  };

  if (!isGetRestaurantSuccess) {
    alert('식당 카드를 들고 올수 없습니다. 카테고리를 더 추가해보세요.');
  }

  return (
    <WaitingRoomForStartPresenter
      users={users}
      onClick={onClick}
      activation={hostId === route.params.myId}
      isGetRestaurantSuccess={isGetRestaurantSuccess}
      crewOnClick={crewOnClick}
      myId={route.params.myId}
    />
  );
};
