import { StackActions } from '@react-navigation/native';
// import * as Analytics from 'expo-firebase-analytics';
import * as Location from 'expo-location';
import React, { useContext, useEffect, useState } from 'react';
import { View } from 'react-native';
// import * as Location from 'expo-location';

import socket from '../../../socket';
import { Context } from '../../../store';
import printSocketEvent from '../../../utils/printEvent';
import InvitePresenter from './InvitePresenter';

export default ({ navigation, route }) => {
  const { state } = useContext(Context);

  // console.log('route: ', route, state);

  // useEffect(() => {
  //   Analytics.setCurrentScreen('invite', 'invite');
  // }, []);
  const [users, setUsers] = useState([]);
  const getLocationAndSendSocketMessage = async () => {
    const location = await Location.getCurrentPositionAsync({});
    const sendMsg = {
      id: socket.query.id,
      // latitude,
      // longitude,
      // count: count++,
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    };

    socket.emit('together', JSON.stringify(sendMsg), (msg) => {
      printSocketEvent('together', msg);

      const paseMsg = JSON.parse(msg);

      console.log(paseMsg);
      setUsers(
        paseMsg.data.aroundUsers.map((user) => {
          return { ...user, selected: false };
        })
      );
    });
  };

  useEffect(() => {
    getLocationAndSendSocketMessage();
  }, [route]);

  // const tmpUsers = route.params.msg.aroundUsers;
  let isSendMsg = false;
  // const [users, setUsers] = useState(
  //   tmpUsers.map((user) => {
  //     return { ...user, selected: false };
  //   })
  // );
  const onClick = () => {
    if (isSendMsg) return;

    isSendMsg = true;

    const result = [];

    users.forEach((user) => {
      if (user.selected) {
        result.push(user.socketId);
      }
    });

    socket.emit(
      'togetherInvite',
      JSON.stringify({
        id: state.user.id,
        inviteTheseUsers: result,
      }),
      (msg) => {
        printSocketEvent('togetherInvite', msg);

        const paseMsg = JSON.parse(msg);

        navigation.dispatch(
          StackActions.replace('WaitingRoomForStart', {
            msg: paseMsg.data,
            myId: state.user.id,
          })
        );
      }
    );
  };

  // return <View />;
  return <InvitePresenter users={users} setUsers={setUsers} onClick={onClick} />;
};
