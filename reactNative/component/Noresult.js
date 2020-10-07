import { StackActions, useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';

import socket from '../socket';
import printSocketEvent from '../utils/printEvent';
import Basic from './Basic';
import Card from './Card';
import Footer from './Footer';

export default ({ roomName, userId }) => {
  let isSendMsg = false;
  const navigation = useNavigation();

  // const latitude = 37.5447048;
  // const longitude = 127.0663154;
  const onClickFooter = () => {
    if (isSendMsg) return;

    isSendMsg = true;

    const sendMsg = {
      id: userId,
      roomName,
    };

    socket.emit('gameRoomJoinAgain', JSON.stringify(sendMsg), (msg) => {
      printSocketEvent('gameROmmJoinAgain', msg);

      const newMsg = {
        ...JSON.parse(msg).data,
        roomName,
      };

      navigation.dispatch(
        StackActions.replace('WaitingRoomForStart', {
          msg: newMsg,
          myId: userId,
        })
      );
    });
  };
  const footer = (
    <Footer style={{ backgroundColor: 'white' }} text="다시하기" onClick={onClickFooter} />
  );

  return (
    <View style={{ flex: 1 }}>
      <Basic footer={footer}>
        <View
          style={{
            width: '100%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Card style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Image source={require('../assets/momulet.png')} />
            <Text style={{ fontSize: 24, marginTop: 10 }}>아무도 좋아요를</Text>

            <Text style={{ fontSize: 24 }}>누르지 않았어요 ㅠㅠ</Text>
          </Card>
        </View>
      </Basic>
    </View>
  );
};
