import React from 'react';
import { View, Image, Text, Dimensions, Animated } from 'react-native';

const { width: WIDTH, height: HEIGHT } = Dimensions.get('window');

export default ({ dislikeOpacity, likeOpacity }) => {
  // console.log("dislikeOpacity : ", dislikeOpacity);
  return (
    <View
      style={{
        position: 'absolute',
        zIndex: 2,
        // backgroundColor: "red",
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}>
      <Animated.View
        style={{
          height: WIDTH / 4.5,
          width: WIDTH / 4.5,

          alignItems: 'flex-start',
          opacity: dislikeOpacity,
        }}>
        <Image
          source={require('../assets/dislikeOut.png')}
          style={{
            height: '100%',
            width: '100%',
            resizeMode: 'contain',
            position: 'absolute',
          }}
        />
        <Image
          source={require('../assets/dislikeIn.png')}
          style={{
            width: WIDTH / 7,
            resizeMode: 'contain',
            marginLeft: WIDTH / 40,
            marginTop: WIDTH / 40,
          }}
        />
        <Text
          style={{
            marginLeft: WIDTH / 20,
            fontSize: 15,
            marginTop: 5,
            color: 'white',
            fontWeight: '500',
            fontFamily: 'NotoSansCJKkr',
          }}>
          싫어요
        </Text>
      </Animated.View>
      <Animated.View
        style={{
          height: WIDTH / 4.5,
          width: WIDTH / 4.5,

          alignItems: 'flex-start',
          opacity: likeOpacity,
        }}>
        <Image
          source={require('../assets/likeOut.png')}
          style={{
            height: '100%',
            width: '100%',
            resizeMode: 'contain',
            position: 'absolute',
          }}
        />
        <Image
          source={require('../assets/likeIn.png')}
          style={{
            width: WIDTH / 7,
            resizeMode: 'contain',
            marginLeft: WIDTH / 40,
            marginTop: WIDTH / 40,
          }}
        />
        <Text
          style={{
            marginLeft: WIDTH / 20,
            fontSize: 15,
            marginTop: 5,
            color: 'white',
            fontWeight: '500',
            fontFamily: 'NotoSansCJKkr',
          }}>
          좋아요
        </Text>
      </Animated.View>
    </View>
  );
};
