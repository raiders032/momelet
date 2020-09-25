import { StackActions } from '@react-navigation/native';
import * as Analytics from 'expo-firebase-analytics';
import React, { useEffect, useState } from 'react';

import socket from '../../../socket';
import printSocketEvent from '../../../utils/printEvent';
import InvitePresenter from './InvitePresenter';

export default ({ navigation, route }) => {
  useEffect(() => {
    Analytics.setCurrentScreen('invite', 'invite');
  }, []);

  const tmpUsers = route.params.msg.aroundUsers;
  let isSendMsg = false;
  const [users, setUsers] = useState(
    tmpUsers.map((user) => {
      return { ...user, selected: false };
    })
  );
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
        id: route.params.user.id,
        inviteTheseUsers: result,
      }),
      (msg) => {
        printSocketEvent('togetherInvite', msg);

        const paseMsg = JSON.parse(msg);

        navigation.dispatch(
          StackActions.replace('WaitingRoomForStart', {
            msg: paseMsg.data,
            myId: route.params.user.id,
          })
        );
      }
    );
  };

  return <InvitePresenter users={users} setUsers={setUsers} onClick={onClick} />;
};
