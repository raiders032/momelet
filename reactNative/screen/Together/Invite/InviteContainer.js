import { StackActions } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';

import socket from '../../../socket';
import printSocketEvent from '../../../utils/printEvent';
import InvitePresenter from './InvitePresenter';

export default ({ navigation, route }) => {
  const tmpUsers = route.params.msg.aroundUsers;
  let isSendMsg = false;
  const [users, setUsers] = useState(
    tmpUsers.map((user) => {
      return { ...user, selected: false };
    })
  );
  const onClick = () => {
    console.log(isSendMsg);

    if (isSendMsg) return;

    isSendMsg = true;
    console.log('이벤트 발생', isSendMsg);

    const result = [];

    users.forEach((user) => {
      if (user.selected) {
        result.push(user.socketId);
      }
    });
    console.log('초대할려는 유저 목록 : ', result);
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
