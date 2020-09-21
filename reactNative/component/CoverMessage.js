import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

export default ({
  zIndex,
  bodyMessage,
  footerMessage,
  coverMessageRightEvent,
  coverMessageLeftEvent,
}) => {
  console.log('뮻', footerMessage);

  return (
    <View
      style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        zIndex,
      }}>
      <View
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: 'black',
          opacity: 0.7,

          justifyContent: 'center',
          alignItems: 'center',
        }}
      />
      <View
        style={{
          width: '100%',
          height: '100%',
          position: 'absolute',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={{
            width: '60%',
            height: '20%',
            justifyContent: 'center',
            AppLoading: 'center',
            backgroundColor: 'white',
            borderRadius: 15,
          }}>
          <View
            style={{
              height: '65%',
              justifyContent: 'center',
              alignItems: 'center',
              borderBottomWidth: 0.2,
              // backgroundColor: "yellow",
            }}>
            {bodyMessage}
          </View>

          <View
            style={{
              height: '35%',
              width: '100%',

              flexDirection: 'row',
            }}>
            <View
              style={{
                width: '50%',
              }}>
              <TouchableOpacity
                style={{
                  // backgroundColor: "black",
                  padding: 15,
                  alignItems: 'center',
                }}
                onPress={coverMessageLeftEvent}>
                <Text>{footerMessage[0]}</Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                width: '50%',
              }}>
              <TouchableOpacity
                style={{
                  // backgroundColor: "black",
                  padding: 15,
                  alignItems: 'center',
                }}
                onPress={coverMessageRightEvent}>
                <Text>{footerMessage[1]}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};
