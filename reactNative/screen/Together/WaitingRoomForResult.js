import { StackActions } from '@react-navigation/native';
import React, { useEffect, useState, useRef } from 'react';
import { View, Text, Image, Animated, TouchableOpacity } from 'react-native';

import Basic from '../../component/Basic';
import Card from '../../component/Card';
import Footer from '../../component/Footer';
import Noresult from '../../component/Noresult';
import socket from '../../socket';
import printSocketEvent from '../../utils/printEvent';

export default ({ navigation, route }) => {
  const [isResultOk, setIsResultOk] = useState(true);
  const rotateValue = useRef(new Animated.Value(0)).current;
  const init = () => {
    rotateValue.setValue(0);
    rotate();
  };
  const rotate = () => {
    Animated.timing(rotateValue, {
      toValue: 360,
      duration: 3000,
      useNativeDriver: true,
    }).start(init);
  };
  const rotateConfig = rotateValue.interpolate({
    inputRange: [0, 360],
    outputRange: ['0deg', '360deg'],
  });

  const footer = (
    <Footer
      text="기다리는중 ..."
      style={{ backgroundColor: 'white' }}
      // onClick={() => {
      //   socket.emit("tmpMsg2", "tmptmp");
      // }}
    />
  );

  useEffect(() => {
    rotate();

    socket.on('gameAllFinish', (msg) => {
      printSocketEvent('gameAllFinish', msg);

      const paseMsg = JSON.parse(msg);

      if (paseMsg.success) {
        navigation.dispatch(
          StackActions.replace('GameResult', {
            msg: paseMsg.data,
            restaurant: route.params.restaurant,
            roomName: route.params.roomName,
            userId: route.params.userId,
            userLocation: route.params.userLocation,
          })
        );
      } else {
        setIsResultOk(false);
      }
    });

    return () => {
      socket.off('gameAllFinish');
    };
  }, []);

  if (isResultOk) {
    return (
      <Basic footer={footer}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Card>
            <Animated.View
              style={{
                width: '100%',
                height: '100%',
                justifyContent: 'center',
                alignItems: 'center',
                transform: [
                  {
                    rotate: rotateConfig,
                  },
                ],
              }}>
              <Image
                source={require('../../assets/momulet.png')}
                style={{ height: '30%', resizeMode: 'contain' }}
              />
            </Animated.View>
          </Card>
        </View>
      </Basic>
    );
  } else {
    return <Noresult roomName={route.params.roomName} userId={route.params.userId} />;
  }
};
