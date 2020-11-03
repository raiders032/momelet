import React from 'react';
import { Image, View, Text, Dimensions } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import Distance from './Distance';
import PresentMenu from './PresentMenu';
import Rating from './Rating';
import SeletedButton from './SeletedButton';
import UnSeletedButton from './UnSeletedButton';

const { width: WIDTH, height: HEIGHT } = Dimensions.get('window');
export default () => {
  return (
    <TouchableOpacity>
      <View
        style={{
          width: '100%',
          borderBottomWidth: 1,
          borderColor: '#cccccc',
          height: HEIGHT / 7,
          // backgroundColor: 'white',
          // justifyContent: 'center',
          // alignItems: 'center',
          // backgroundColor: 'blue',
          // flexDirection: 'row',
        }}>
        <View style={{ width: '100%', height: '100%', padding: 10, flexDirection: 'row' }}>
          <View
            style={{
              height: '100%',
              width: WIDTH / 5,
              // backgroundColor: 'red',

              justifyContent: 'center',
              // marginTop: 20,
            }}>
            <Image
              style={{
                height: WIDTH / 5,
                width: WIDTH / 5,
                borderRadius: 20,
                resizeMode: 'cover',
              }}
              source={{
                uri:
                  'https://dimg.donga.com/a/500/0/90/5/ugc/CDB/29STREET/Article/5e/b2/04/e8/5eb204e81752d2738236.jpg',
              }}
            />
          </View>
          <View
            style={{
              width: WIDTH / 2,
              padding: 3,
              marginLeft: 4,
              justifyContent: 'space-between',
            }}>
            <Text style={{ fontSize: 17, fontWeight: '500' }}>착한피자 사당방배점</Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',

                marginVertical: 5,
              }}>
              <Rating rating="4.3" scale={12} />
              <Distance distance="300M" />
            </View>
            <PresentMenu menu="치즈피자" price="7000" fontSize={10} />
            <PresentMenu menu="화덕피자" price="9000" fontSize={10} />
          </View>
          <View style={{ flex: 1, alignItems: 'flex-end' }}>
            <SeletedButton />
            <UnSeletedButton />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};
