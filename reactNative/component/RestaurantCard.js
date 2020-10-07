import React, { useRef, useEffect, useState } from 'react';
import {
  View,
  Image,
  Text,
  Dimensions,
  Animated,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import { set } from 'react-native-reanimated';

import { calculateDistance } from '../utils/calculateDistance';
// import logging from '../utils/logging';
import Card from './Card';
import CardBack from './CardBack';
import PresentMenu from './PresentMenu';
import RestaurantBasicInfo from './RestaurantBasicInfo';
import SeeMenuButton from './SeeMenuButton';

export default ({ restaurant, header, cover, userLocation }) => {
  const baseUrl = 'https://cdn.pixabay.com/photo/2020/06/29/10/55/pizza-5352320__480.png';

  const [isFront, setIsFront] = useState(true);
  let changeValue = 0;
  const rotation = useRef(new Animated.Value(0)).current;

  rotation.addListener(({ value }) => {
    changeValue = value;
  });

  useEffect(() => {
    rotation.setValue(0);
    // setIsFront("false");
    setIsFront(true);
  }, [restaurant]);

  const frontInterpolate = rotation.interpolate({
    inputRange: [0, 180],
    outputRange: ['0deg', '180deg'],
  });

  const backInterpolate = rotation.interpolate({
    inputRange: [0, 180],
    outputRange: ['180deg', '360deg'],
  });

  // const isFlipping = useRef(false);
  let isFlipping = false;

  const flipCard = async () => {
    // if (isFlipping) {
    //   return;
    // }

    // isFlipping = true;
    // await logging({
    //   eventName: 'BTN_SEEMENU',
    //   config: {
    //     name: 'seeMenuButton',
    //     screen: 'Home',
    //     purpose: 'Viewing importance of menu in restaurant',
    //   },
    // });

    if (changeValue >= 90) {
      Animated.timing(rotation, {
        toValue: 0,
        useNativeDriver: true,
      }).start();

      setIsFront(true);
    } else {
      Animated.timing(rotation, {
        toValue: 180,
        useNativeDriver: true,
      }).start();

      setIsFront(false);
    }

    setTimeout(() => {
      isFlipping = false;
    }, 1000);
  };

  const CardImage = React.useCallback(() => {
    return (
      <Image
        // source={{ uri: restaurant.thumUrl }} // @FIXME restaurant.thumbUrl
        source={
          restaurant.thumUrl == baseUrl
            ? { uri: baseUrl }
            : {
                uri:
                  'https://search.pstatic.net/common/?autoRotate=true&type=w560_sharpen&quality=90&src=' +
                  restaurant.thumUrl,
              }
        } // @FIXME restaurant.thumbUrl
        // source={{
        //   uri: "https://d22j25xnhsuyth.cloudfront.net/profile-image/test7.jpg",
        // }}
        style={{
          height: '100%',
          borderTopRightRadius: 20,
          borderTopLeftRadius: 20,
        }}
      />
    );
  }, [restaurant.thumUrl]);

  // const CardBackCallBack = React.useCallback(() => {
  //   return (
  //     <Animated.View
  //       style={{
  //         width: "100%",
  //         height: "100%",
  //         transform: [{ rotateY: backInterpolate }],
  //         backfaceVisibility: "hidden",
  //         position: "absolute",
  //       }}
  //     >
  //       <CardBack
  //         menus={restaurant.menu}
  //         name={restaurant.name}
  //         phoneNumber={restaurant.phoneNumber}
  //         address={restaurant.roadAddress}
  //       />
  //     </Animated.View>
  //   );
  // }, [restaurant]);
  // const CardFront = React.useCallback(() => {
  //   return ()
  // })
  const distance = calculateDistance(userLocation, {
    latitude: restaurant.latitude,
    longitude: restaurant.longitude,
  });

  return (
    <Card>
      <View style={{ width: '100%', height: '100%' }}>
        <View style={{ height: '65%' }}>
          <Animated.View
            style={{
              transform: [{ rotateY: frontInterpolate }],
              backfaceVisibility: 'hidden',
            }}>
            {/* {header} */}

            <CardImage />
            {cover}
          </Animated.View>
          <Animated.View
            style={{
              width: '100%',
              height: '100%',
              transform: [{ rotateY: backInterpolate }],
              backfaceVisibility: 'hidden',
              position: 'absolute',
            }}
            pointerEvents={isFront ? 'none' : 'auto'}>
            <CardBack
              menus={restaurant.menu}
              name={restaurant.name}
              phoneNumber={restaurant.phoneNumber}
              address={restaurant.roadAddress}
              lng={restaurant.longitude}
              lat={restaurant.latitude}
              userLocation={userLocation}
            />
          </Animated.View>
        </View>

        <View style={{ height: '35%', paddingHorizontal: 15 }}>
          <View
            style={{
              height: '45%',
              // backgroundColor: 'black',
            }}>
            <View
              style={{
                height: '100%',
                borderColor: '#e4e4e4',
                borderBottomWidth: 0.7,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                // backgroundColor: 'black',
              }}>
              <RestaurantBasicInfo title={restaurant.name} distance={distance} point="4.4점" />
              <TouchableOpacity style={{ width: '20%', height: '40%' }} onPress={flipCard}>
                <SeeMenuButton />
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{
              height: '55%',
              justifyContent: 'center',
            }}>
            <Text style={{ fontSize: 18, marginBottom: 10 }}>대표메뉴</Text>
            {restaurant.menu[0] && (
              <PresentMenu menu={restaurant.menu[0].name} price={restaurant.menu[0].price} />
            )}
            {restaurant.menu[1] && (
              <PresentMenu menu={restaurant.menu[1].name} price={restaurant.menu[1].price} />
            )}
          </View>
        </View>
      </View>
    </Card>
  );
};
