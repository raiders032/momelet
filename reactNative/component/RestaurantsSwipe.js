import React, { useRef, useState, useEffect } from 'react';
import { View, Animated, PanResponder, Dimensions } from 'react-native';

import Basic from './Basic';
import Card from './Card';
import RestaurantCard from './RestaurantCard';
import RestaurantHeader from './RestaurantHeader';

const { width: WIDTH, height: HEIGHT } = Dimensions.get('window');

export default ({ restaurants, userLocation, BookMarkArray }) => {
  const [restaurant, setRestaurant] = useState(restaurants);
  const BookmarkArrayId = useRef([]);

  useEffect(() => {
    setRestaurant(restaurants);
  }, [restaurants]);

  const [firstRestaurant, secondRestaurant, ...otherRestaurant] = restaurant;

  const position = new Animated.ValueXY({ x: 0, y: 0 });

  useEffect(() => {
    BookmarkArrayId.current = [];
    BookMarkArray.current.map((obj) => {
      BookmarkArrayId.current.push(obj.id);
    });

    position.setValue({ x: 0, y: 0 });
  }, []);

  const rotationValues = position.x.interpolate({
    inputRange: [-200, 0, 200],
    outputRange: ['-13deg', '0deg', '13deg'],
    extrapolate: 'clamp',
  });
  const topPositionConfig = position.x.interpolate({
    inputRange: [-200, 0, 200],
    outputRange: [0, 10, 0],
    extrapolate: 'clamp',
  });
  const scaleXPositionConfig = position.x.interpolate({
    inputRange: [-200, 0, 200],
    outputRange: [1, 0.1, 1],
    extrapolate: 'clamp',
  });
  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: (evt, gestureState) => true,
    onPanResponderMove: (evt, { dx, dy }) => {
      position.setValue({ x: dx, y: dy });
    },
    onPanResponderRelease: (evt, { dx, dy }) => {
      if (dx >= 150) {
        Animated.timing(position, {
          toValue: {
            x: WIDTH + 50,
            y: dy,
          },
          duration: 200,
          useNativeDriver: false,
        }).start(() => {
          setRestaurant([secondRestaurant, ...otherRestaurant]);
        });
      } else if (dx <= -150) {
        Animated.timing(position, {
          toValue: {
            x: -WIDTH - 50,
            y: dy,
          },
          duration: 100,
          useNativeDriver: false,
        }).start(() => {
          setRestaurant([secondRestaurant, ...otherRestaurant]);
        });
      } else {
        Animated.spring(position, {
          toValue: {
            x: 0,
            y: 0,
          },
          useNativeDriver: false,
        }).start();
      }
    },
  });

  return (
    <View
      style={{
        flex: 1,
      }}>
      {/* <View
          style={{
            top: 10,
            width: "100%",
            height: "100%",
            justifyContent: "center",
            alignItems: "center",

            transform: [{ scaleX: 0.95 }],
          }}
          {...panResponder.panHandlers}
        >
          {otherRestaurant?.reverse().map((restaurant, idx) => (
            <RestaurantCard key={idx} restaurant={restaurant} />
          ))}
        </View> */}
      <View
        style={{
          width: '100%',
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          top: 10,
          zIndex: -2,
          transform: [{ scaleX: 0.95 }],
        }}>
        <Card />
      </View>
      <Animated.View
        style={{
          // top: topPositionConfig,
          width: '100%',
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'absolute',
          zIndex: -1,
          // transform: [{ scaleX: scaleXPositionConfig }],
        }}
        {...panResponder.panHandlers}>
        {secondRestaurant ? (
          <RestaurantCard
            restaurant={secondRestaurant}
            userLocation={userLocation}
            BookmarkArrayId={BookmarkArrayId}
          />
        ) : (
          <View />
        )}
      </Animated.View>
      <Animated.View
        style={{
          width: '100%',
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'absolute',
          transform: [{ rotate: rotationValues }, ...position.getTranslateTransform()],
        }}
        {...panResponder.panHandlers}>
        {firstRestaurant ? (
          <RestaurantCard
            restaurant={firstRestaurant}
            userLocation={userLocation}
            BookmarkArrayId={BookmarkArrayId}
          />
        ) : (
          <View />
        )}
      </Animated.View>
      {/* <TouchableOpacity
          style={{ zIndex: zIdx, width: "100%", height: "100%" }}
          activeOpacity={1}
          onPress={() => {
            console.log("f");
            setZIdx(-1);
          }}
        >
          <View
            style={{
              width: "100%",
              height: "100%",
              backgroundColor: "grey",
              justifyContent: "center",
              alignItems: "center",
              opacity: 0.8,
            }}
          ></View>
        </TouchableOpacity>
        <View
          style={{
            width: "70%",
            height: "30%",
            zIndex: 2,
            backgroundColor: "white",
            position: "absolute",
            opacity: 0.9,
            borderRadius: 20,
          }}
        ></View> */}
    </View>
  );
};
