import { AppLoading } from 'expo';
import { Asset } from 'expo-asset';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import * as SecureStore from 'expo-secure-store';
import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';

import { apis } from '../../api';
import socket from '../../socket';
import getInvalidToken from '../../utils/getInvalidToken';
import printSocketEvent from '../../utils/printEvent';
import MainPresenter from './MainPresenter';

// 홈 식당 카드의 api 호출 데이터 전달

export default ({ navigation, route }) => {
  const [isReady, setIsReady] = useState(false);
  const [user, setUser] = useState(null);
  const [isChanged, setIsChanged] = useState(1);
  // const [isDisconnect, setIsDisconnect] = useState(false);
  const [coverMessageConfig, setCoverMessageConfig] = useState({
    zIndex: -1,
    bodyMessage: (
      <>
        <Text>abc</Text>
        <Text>abc</Text>
      </>
    ),
    footerMessage: ['예', '아니요'],
    coverMessageRightEvent: () => {},
    coverMessageLeftEvent: () => {},
  });
  const [restaurants, setRestaurants] = useState({
    loading: true,
    restaurants: [],
  });
  const [userLocation, setUserLocation] = useState(null);

  if (route.params?.isChanged) {
    setIsChanged((before) => {
      return before ? 0 : 1;
    });

    route.params.isChanged = false;
  }

  const _loadAssetsAsync = async () => {
    await Promise.all(
      restaurants.restaurants.map((restaurant) => Asset.loadAsync(restaurant.imageUrl))
    );
  };

  const getUser = async () => {
    try {
      const result = await apis.getUserMe();

      console.log('get User Success \n');
      console.log('로그인한 유저의 정보 ');
      console.log('    id : ', result.data.data.userInfo.id);
      console.log('    이름 : ', result.data.data.userInfo.name);
      setUser(result.data);

      return { ...result.data };
    } catch (error) {
      console.log('error in get user', error);
    }
  };

  const getUserRestaurant = async (latitude, longitude) => {
    // console.log(latitude, longitude);
    if (user) {
      try {
        const response = await apis.getRestaurant(latitude, longitude, user.data.userInfo.id);

        console.log('get Restaurant Success');
        // console.log(response);
        setRestaurants({ loading: false, restaurants: response.data.data });
      } catch (e) {
        console.log('error In HomeContainer : getUserRestaurant', e);
      }
    }
  };
  const socketConnect = async (latitude, longitude) => {
    if (user !== null) {
      const nowUser = user.data.userInfo;
      const jwtToken = await getInvalidToken();

      // socket.query.JWT = route.params.userToken;
      socket.query.JWT = jwtToken;
      socket.query.email = nowUser.email;
      socket.query.imageUrl = nowUser.imageUrl;
      socket.query.name = nowUser.name;
      socket.query.id = nowUser.id;
      socket.query.latitude = latitude;
      socket.query.longitude = longitude;
      socket.open();
      socket.emit('authenticate', { token: jwtToken });
      socket.on('authenticated', () => {
        // console.log('connect!');
      });
      // socket.on('disconnect', (msg) => {
      //   console.log('MainContainer / 디스커넥트 발생', msg);
      //   // Restart();
      // });
      socket.on('togetherInvitation', (msg) => {
        printSocketEvent('togetherInvitation', msg);

        const paseMsg = JSON.parse(msg);

        setCoverMessageConfig((before) => {
          return {
            ...before,
            zIndex: 1,
            bodyMessage: (
              <>
                <Text>{paseMsg.data.hostName}님이</Text>
                <Text>초대하였습니다.</Text>
              </>
            ),

            coverMessageRightEvent: () => {
              setCoverMessageConfig((before) => {
                return { ...before, zIndex: -1 };
              });
            },
            coverMessageLeftEvent: () => {
              const sendMsg = {
                id: nowUser.id,
                roomName: paseMsg.data.roomName,
              };

              socket.emit('gameRoomJoin', JSON.stringify(sendMsg), (msg) => {
                printSocketEvent('gameRoomJoin', msg);

                const paseMsg = JSON.parse(msg);
                const { roomName, gameRoomUserList, hostId } = paseMsg.data;
                const sendMsg = {
                  roomName,
                  gameRoomUserList,
                  hostId,
                };

                setCoverMessageConfig((before) => {
                  return { ...before, zIndex: -1 };
                });

                if (paseMsg.success === true) {
                  navigation.navigate('WaitingRoomForStart', {
                    msg: sendMsg,
                    myId: nowUser.id,
                  });
                }
              });
            },
          };
        });
      });
    }
  };
  const getRestaurantAndSocketConnect = async () => {
    const { status, permissions, canAskAgain, ios, android } = await Permissions.askAsync(
      Permissions.LOCATION
    );

    if (status === 'granted') {
      const location = await Location.getCurrentPositionAsync({});

      const latitude = 37.5447048;
      const longitude = 127.0663154;

      await getUserRestaurant(
        latitude,
        longitude

        // location.coords.latitude,
        // location.coords.longitude
      );
      // await socketConnect(location.coords.latitude, location.coords.longitude);
      await socketConnect(latitude, longitude);
      setUserLocation({ latitude, longitude });
    } else {
      alert('위치 권한이 없어서 실행 할 수 없습니다. 앱 설정에서 위치 권한을 허용해주세요.');
    }
    // const { latitude, longitude } = location.coords;
  };

  useEffect(() => {
    getUser();
  }, [isChanged]);

  useEffect(() => {
    getRestaurantAndSocketConnect();

    return () => {
      socket.disconnect();
    };
  }, [user]);
  // useEffect(() => {}, [user]);

  //같이 하기 버튼 클릭시
  const sendTogetherMessage = async () => {
    const nowUser = user;

    // latitude , longitude 있음 , 나중에 사용 바람.!!!!

    const location = await Location.getCurrentPositionAsync({});

    const sendMsg = {
      id: socket.query.id,
      latitude: 37.5447048,
      longitude: 127.0663154,

      // latitude: location.coords.latitude,
      // longitude: location.coords.longitude,
    };

    socket.emit('together', JSON.stringify(sendMsg), (msg) => {
      printSocketEvent('together', msg);

      const paseMsg = JSON.parse(msg);

      navigation.navigate('Together', {
        msg: paseMsg.data,
        user: user.data.userInfo,
      });
    });
    // const sendMsg = { id: nowUser.id, latitude: number, longitude: number }
    // socket.emit("together", JSON.stringify(msg), (msg) => {
    //   navigation.navigate("Together", { msg, user: user.data.userInfo });
    //   // navigation.navigate("Together", { msg, user: "abc" });
    //   // navigation.dispatch(StackActions.replace("Together", { msg: msg }));
    // });
  };

  if (restaurants.loading) {
    return <View />;
  } else {
    return (
      <MainPresenter
        navigation={navigation}
        route={route}
        restaurants={restaurants.restaurants.restaurants}
        user={user}
        sendTogetherMessage={sendTogetherMessage}
        coverMessageConfig={coverMessageConfig}
        userLocation={userLocation}
      />
    );
  }
};
